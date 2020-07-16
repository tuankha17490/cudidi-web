import UserRespository from "./respository"
import BaseServices from '../../core/Service';
import RoleRespository from "../roles/respository"
import getSlug from "slugify"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import process from "process"
import fs from "fs"
import {
    uploads
} from "../../../Config/cloundinary"
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
            if (checkUser) {
                return {
                    status: 400,
                    error: {
                        message: 'Username is registered by another people !!!'
                    }
                }
            }
            const dataFetch = await this.respository.create(param);
            return {
                status: 201,
                message: 'Success !!!',
                data: {
                    Username:dataFetch.Username,
                    Password:dataFetch.Password
                }
            };
        } catch (error) {
            return error
        }
    }
    async login(param) {
        const queryData = await this.respository.getBy({
            Username: param.Username
        }).withGraphFetched('roles')
        if (queryData) {
            const checkPassWordHashed = bcrypt.compareSync(param.Password, queryData.Password)
            if (checkPassWordHashed) {
                const token = await jwt.sign({
                    Username: queryData.Username,
                    ID: queryData.ID,
                }, process.env.JWT_KEY, {
                    expiresIn: "2h"
                })
                return {
                    status: 200,
                    message: 'Login Success',
                    token,
                    data: {
                        Email: queryData.Email,
                        Slug: queryData.Slug,
                        FullName: queryData.FullName,
                        Role: queryData.roles.Name
                    }
                }
            } else {
                return {
                    status: 400,
                    message: 'Login Failed !!! Password is wrong'
                }
            }
        } else {
            return {
                status: 400,
                message: 'Login Failed !!! Account is not registered'
            }
        }
    }
    async updateUserById(req, id) {
        try {
            const data = req.body
            const checkUsername = await this.respository.getBy({
                Username: data.Username
            })
            if(checkUsername) {
                return {
                    status:400,
                    message: 'Email is registered by another people !!!'
                }
            }
            data.Password = bcrypt.hashSync(data.Password, 10)
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
            return {
                status: 200,
                message: 'User uploaded successfully',
                data: result
            }
        } catch (error) {
            return {
                status: 400,
                error: error.toString(),
                message: 'Update information of user failed'
            }
        }
    }
    async uploadAvatar(req) {
        try {
            const {file} = req
            const id = req.userData.ID
            const image = await uploads(file.path, 'Images');
            const Avatar = image.url
            await this.respository.updateById({
                Avatar
            }, id)
            await fs.unlinkSync(file.path)
            return {
                status: 200,
                message: 'Avatar of user uploaded successfully',
                data: {
                    Avatar
                }
            }
        } catch (error) {
            return {
                status: 400,
                error: error.toString(),
                message: 'Upload avatar failed'
            }
        }
    }
    async passwordConfirm(req) {
        try {
            const password = req.body.Password
            const id = req.userData.ID
            const data = await this.respository.findAt(id)
            const status = bcrypt.compareSync(password, data.Password)
            if (status) {
                return {
                    status: 200,
                    message: 'Password correct. Confirm password successful !!!'
                }
            } else {
                return {
                    status: 400,
                    message: 'Password is incorrect'
                }
            }
        } catch (error) {
            return {
                status: 400,
                error: error.toString(),
                message: 'Password confirm failed'
            }
        }
    }
    async getMe(decode) {
        try {
            const data = await this.respository
                .findAt(decode.ID, ['ID', 'FullName', 'Username', 'Email', 'Address', 'Avatar', 'PhoneNumber', 'BirthDay', 'Slug'])
                .withGraphFetched('roles')
            return {
                status: 200,
                message: 'Success !!!',
                data
            }
        } catch (error) {
            return {
                status: 400,
                message: 'Fail to get profile user',
                error: error.toString()
            }
        }
    }

   
}