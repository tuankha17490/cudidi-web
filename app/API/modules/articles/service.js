import ArticleRespository from "./respository"
import BaseServices from '../../core/Service';
import getSlug from "slugify"
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
    
}