import UserRespository from "./respository"
import BaseServices from '../../core/Service';
import RoleRespository from "../roles/respository"
import getSlug from "slugify"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import process from "process"
import fs from "fs"
import response from "../../../Util/Response"
import convertString from "../../../Util/ExcuteString"
import {
    uploads
} from "../../../Services/cloundinary"
dotenv.config({
    silent: process.env.NODE_ENV === 'production'
});
export default class UserService extends BaseServices {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return UserRespository.Instance();
    }

    async create(param) {
        try {
            const checkUser = await this.respository.getBy({
                Username: param.Username
            })
            if (checkUser) {
                return response(403,'Username is registered by another people !!!')
            }
            const Slug = getSlug(param.FullName + ' ' + Date.now(), {
                replacement: '.',
                lower: true
            })
            param.Slug = Slug
            param.Password = bcrypt.hashSync(param.Password, 10)
            const checkRole = await RoleRespository.Instance().getBy({
                Name: 'Client'
            })
            if (!checkRole) {
                const createRole = await RoleRespository.Instance().create({
                    Name: 'Client'
                })
                param.Role_Id = createRole.ID
            } else {
                param.Role_Id = checkRole.ID
            }
           
            await this.respository.create(param);
            return response(201, 'Success !!!');
        } catch (error) {
            return response(400,error.toString())
        }
    }
    async login(param) {
        try {
           
            const queryData = await this.respository.getBy({
                Username: param.Username
            }).withGraphFetched('roles')
            if (queryData) {
                const checkPasswordHashed = bcrypt.compareSync(param.Password, queryData.Password)
                console.log(checkPasswordHashed);
                if (checkPasswordHashed) {
                    const token = await jwt.sign({
                        Username: queryData.Username,
                        ID: queryData.ID,
                        Password: queryData.Password
                    }, process.env.JWT_KEY, {
                        expiresIn: "2h"
                    })
                    return {
                        status: 200,
                        message: 'Login Success',
                        token,
                        Email: queryData.Email,
                        Slug: queryData.Slug,
                        FullName: queryData.FullName,
                        Role: queryData.roles.Name
                    }
                } else {
                    throw 'Login Failed !!! Password is wrong'
                }
            } else {
                throw 'Login Failed !!! Account is not registered'
            }
        } catch (error) {
            return response(400,error.toString())
        }
    }
    async updateUserById(req, id) {
        try {
            const data = req.body
            const checkUsername = await this.respository.getBy({
                Username: data.Username
            })
            if (checkUsername && id != checkUsername.ID) {
                return response(403, 'Username is registered by another people !!!')
            }
            if(bcrypt.compareSync(data.passwordConfirm, req.userData.Password)){
                const dataFetch = await this.respository.updateAndFetchById(data, id)
                const result = {
                    Username: dataFetch.Username,
                    FullName: dataFetch.FullName,
                    Email: dataFetch.Email,
                    ID: dataFetch.ID,
                    PhoneNumber: dataFetch.PhoneNumber,
                    BirthDay: dataFetch.BirthDay,
                    Slug: dataFetch.Slug,
                    Address: dataFetch.Address
                }
                return response(200,'User uploaded successfully',result)
            }
            else {
                throw 'Password confirm is wrong'
            }
        } catch (error) {
            return response(400,error.toString())
        }
    }
    async uploadAvatar(req) {
        try {
            const {
                file
            } = req
            const id = req.userData.ID
            const image = await uploads(file.path, req.userData.Username);
            console.log('image', image);
            const Avatar = image.url
            await this.respository.updateById({
                Avatar
            }, id)
            await fs.unlinkSync(file.path)
            return response(200,'Avatar of user uploaded successfully',Avatar)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async passwordConfirm(req) {
        try {
            const password = req.body.Password
            const id = req.userData.ID
            const data = await this.respository.findAt(id)
            const status = bcrypt.compareSync(password, data.Password)
            if (status) {
                return response(200,'Password correct. Confirm password successful !!!')
            } else {
                throw 'Password is incorrect'
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getMe(decode) {
        try {
            const data = await this.respository
                .findAt(decode.ID, ['ID', 'FullName', 'Username', 'Email', 'Address', 'Avatar', 'PhoneNumber', 'BirthDay', 'Slug'])
                .withGraphFetched('roles')
                return response(200, 'Success !!!',data)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async updatePassword(req) {
        try {
            const id = req.userData.ID
            const {oldPassword} = req.body
            const {newPassword} = req.body
            const data = await this.respository.findAt(id)
            if(bcrypt.compareSync(oldPassword, data.Password)) {
                const Password = bcrypt.hashSync(newPassword, 10)
                const updateFetched = await this.respository.updateAndFetchById({Password}, id)
                return response(200, 'Update Success !!!', updateFetched)
            }
            throw 'Old password incorrect !!! '
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async loginByGoogle(accessToken, refreshToken ,profile, done)  {
        try {
            if(profile) {
                const checkGoogleID = await UserRespository.Instance().getBy({GoogleID: profile.id})
                let result = 0
                if(!checkGoogleID) {
                    const data = {}
                    data.GoogleID = profile.id
                    data.Email = profile.emails[0].value
                    data.Avatar = profile.photos[0].value
                    data.FullName = profile.name.familyName + ' '+ profile.name.givenName
                    const roleID = await RoleRespository.Instance().getBy({Name:'Client'}, ['ID'])
                    console.log('role id ------>', roleID);
                    data.Role_Id = roleID.ID
                    const Slug = getSlug(data.FullName + ' ' + Date.now(), {
                        replacement: '.',
                        lower: true,
                        locale: 'vi'    
                    })
                    data.Slug = Slug
                    data.FullName = convertString(data.FullName)
                    console.log('full name', data.FullName);
                    result = await UserRespository.Instance().create(data)
                }
                const token = await jwt.sign({
                    Email: result.Email,
                    ID: result.ID,
                }, process.env.JWT_KEY, {
                    expiresIn: "2h"
                })
                return done(null,response(200, 'Login by google success !!!', token))
            }
        } catch (error) {
            console.log('error status', error.status);
            console.log('error --->', error);
            return done(response(error.errno,error.message))
        }
    }

}