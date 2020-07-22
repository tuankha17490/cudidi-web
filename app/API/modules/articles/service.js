import ArticleRespository from "./respository"
import BaseServices from '../../core/Service';
import getSlug from "slugify"
import dotenv from "dotenv"
import process from "process"
import fs from "fs"
import response from "../../../Util/Response"
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
        return ArticleRespository.Instance();
    }
    async create(req) {
        try {
            const data = req.body
            const Slug = getSlug(data.Title + ' ' + Date.now(), {
                replacement: '.',
                lower: true
            })
            data.Slug = Slug
            data.User_Id = req.userData.ID
            const result = await this.respository.graphInsert(data)
            return {
                status: 200,
                message: 'Create article success',
                result
            }
        } catch (error) {
            return {
                status: 400,
                message: 'Create article failed',
                error: error.toString()
            }
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
            return response(200, 'Avatar of user uploaded successfully', Avatar)
        } catch (error) {
            return response(400, error.toString())
        }
    }
}