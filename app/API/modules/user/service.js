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
                data: dataFetch
            };
        } catch (error) {
            return error
        }
    }

    async login(param) {
        const queryData = await this.respository.getBy({
            Username: param.Username
        });
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
                        Username: queryData.Username,
                        Email: queryData.Email,
                        Slug: queryData.Slug,
                        ID: queryData.ID,
                        FullName: queryData.FullName
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
            const image = await uploads(req.file.path, 'Images');
            data.Avatar = image.url
            await fs.unlinkSync(req.file.path)
            data.Password = bcrypt.hashSync(data.Password, 10)
            const result = await this.respository.updateById(data, id)
            return {
                status: 200,
                message: 'User uploaded successfully',
            }
        } catch (error) {
            return {
                status: 400,
                error: error.toString()
            }
        }
    }

}