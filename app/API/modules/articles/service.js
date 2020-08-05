import ArticleRespository from "./respository"
import DescriptionArticleRespository from "../description-article/respository"
import BaseServices from '../../core/Service';
import getSlug from "slugify"
import dotenv from "dotenv"
import process from "process"
import jwt from "jsonwebtoken"
import fs from "fs"
import response from "../../../Util/Response"
import {
    uploads
} from "../../../Services/cloundinary"
dotenv.config({
    silent: process.env.NODE_ENV === 'production'
});
export default class ArticleService extends BaseServices {
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
            const result = await this.respository.create(data)
            return {
                status: 200,
                message: 'Create article success',
                result
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async uploadImage(req) {
        try {
            const {
                file
            } = req
            const image = await uploads(file.path, 'Article');
            const Avatar = image.url
            await fs.unlinkSync(file.path)
            return response(200, 'Avatar of user uploaded successfully', Avatar)
        } catch (error) {
            return response(400, error.toString())
        }
    }

    async updateImage(req) {
        try {
            const {
                file
            } = req
            const image = await uploads(file.path, req.params.articleSlug);
            const Avatar = image.url
            await this.respository.update({
                Avatar
            }, {
                Slug: req.params.articleSlug
            })
            await fs.unlinkSync(file.path)
            return response(200, 'Image of article updates successfully', Avatar)
        } catch (error) {
            return response(400, error.toString())
        }
    }

    async getInformation(condition, table) {
        try {
            const data = await this.respository.getBy(condition).withGraphFetched(table).modifyGraph(table, builder => {
                builder.select('FullName', 'ID', 'Avatar')
            })
            if (data) {
                if (data.isDeleted == 1) return response(404, 'The article was deleted')
                data.User_Id = undefined
            }
            return response(200, 'Success !!!', data)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async updateById(req) {
        try {
            if (req.userData.Role == 'Users') {
                if (req.userData.ID != req.params.id) {
                    return response(403, 'You don not have permission to access')
                }
            }
            const data = req.body
            const id = req.params.id
            const checkData = await this.respository.findAt(id).withGraphFetched('users')
            if (checkData) {
                if (checkData.isDeleted == 1) {
                    return response(404, 'Article Was deleted')
                }
            }
            if (checkData.users.ID != req.userData.ID) {
                throw 'Only writer is allowed to edit'
            }
            // if(data.Duration < checkData.Duration) {
            //     for (let i = data.Duration + 1; i <= checkData.Duration; i++) {
            //         await DescriptionArticleRespository.Instance().deleteSoft({ID: i})
            //     }
            // }
            if (data.Duration != checkData.Duration) {
                return response(400, 'Can not edit duration')
            }
            const result = await this.respository.updateById(data, id)
            return response(200, 'Success !!!', result)
        } catch (error) {
            console.log(error.toString());
            response(400, 'Update article failed !!!')
        }
    }

    async getList(page, limit, table = '', column = ['*']) {
        try {
            const count = await this.respository.count();
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.listOffSet(offset, limit, column).where({
                    isDeleted: 0
                })
                .withGraphFetched(table).modifyGraph(table, builder => {
                    builder.select('ID', 'FullName', 'Avatar')
                })
            return response(200, 'Success !!!', data)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getListWithUser(userID, page, limit) {
        try {
            const count = await this.respository.count().where({
                User_Id: userID,
                isDeleted: 0
            })
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.listOffSet(offset, limit).where({
                User_Id: userID,
                isDeleted: 0
            })
            return response(200, 'Success !!!', data)
        } catch (error) {
            console.log('GET LIST WITH USER', error.toString());
            return response(400, 'Get list article of user failed')
        }
    }

    async getListWithSlug(req) {
        try {
            const slug = req.params.articleSlug
            let query = 0
            if (req.userData != undefined) {
                query = await this.respository.tableQuery().select('*').where('Slug', slug)
                .where('isDeleted', 0).withGraphFetched('[descriptionArticles, users, rateArticles]')
                .modifyGraph('descriptionArticles', builder => {
                    builder.orderBy('Day', 'inc')
                })
                .modifyGraph('users', builder => {
                    builder.select('ID', 'FullName', 'Username', 'Email', 'Avatar', 'PhoneNumber')
                })
                .modifyGraph('rateArticles', builder => {
                    builder.select('Rate').where({User_Id: req.userData.ID})
                })
            }
            else {
                query = await this.respository.tableQuery().select('*').where('Slug', slug)
                .where('isDeleted', 0).withGraphFetched('[descriptionArticles, users]')
                .modifyGraph('users', builder => {
                    builder.select('ID', 'FullName', 'Username', 'Email', 'Avatar', 'PhoneNumber')
                })
                .modifyGraph('descriptionArticles', builder => {
                    builder.orderBy('Day', 'inc')
                })
            }
           
            if (query.length == 0) {
                return response(404, 'Not found')
            }
            const result = {}
            result.descriptionArticles = query[0].descriptionArticles
            result.users = query[0].users
            query[0].descriptionArticles = undefined
            query[0].users = undefined
            if(query[0].rateArticles != undefined) result.users.rateArticles = query[0].rateArticles[0].Rate
            query[0].rateArticles = undefined
            result.articles = query[0]
            return response(200, 'Success !!!', result)
        } catch (error) {
            console.log('Article service list with slug', error.toString());
            return response(400, 'Get list with slug failed')
        }
    }

    async getListRelation(req) {
        try {
            const query = await this.respository.getBy({
                Slug: req.params.articleSlug
            })
            if (query) {
                if (query.isDeleted == 1) {
                    throw 'The article was deleted'
                }
                const result = await this.respository.listOffSet(0, 5)
                    .havingNotBetween('ID', [query.ID, query.ID]).havingBetween('NumberOfPeople', [query.NumberOfPeople - 2, query.NumberOfPeople + 4])
                    .where({
                        Location: query.Location
                    }).orWhere({
                        User_Id: query.User_Id
                    })
                return response(200, 'Success', result)
            }

        } catch (error) {
            console.log('Article service list with slug', error.toString());
            return response(400, error.toString())
        }
    }

    async updateBySlug(req) {
        try {
            const data = req.body
            const slug = req.params.articleSlug
            const checkData = await this.respository.getBy({
                Slug: slug
            })
            if (checkData) {
                if (req.userData.Role == 'Users') {
                    if (checkData.User_Id != req.userData.ID) {
                        return response(403, 'Only writer is allowed to edit')
                    }
                }
                if (checkData.isDeleted == 1) {
                    return response(404, 'Article Was deleted')
                }
            } else {
                return response(404, 'Not found')
            }
            if (data.Duration < checkData.Duration) {
                for (let i = data.Duration + 1; i <= checkData.Duration; i++) {
                    await DescriptionArticleRespository.Instance().delete({
                        Day: i,
                        Article_Id: checkData.ID
                    })
                }
            }
            const result = await checkData.$query().patchAndFetch(data)
            return response(200, 'Success !!!', result)
        } catch (error) {
            console.log('ARTICLE_UPDATE_SERVICE', error.toString());
            return response(400, error.toString())
        }
    }
}