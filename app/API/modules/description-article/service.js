import DescriptionArticleRespository from "./respository"
import ArticleRespository from "../articles/respository"
import ImageArticleRespository from "../image-article/respository"
import response from "../../../Util/Response"
import BaseServices from '../../core/Service';
export default class DescriptionArticleService extends BaseServices {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return DescriptionArticleRespository.Instance();
    }
    async create(req) {
        try {
            const data = req.body
            const checkarticle = await ArticleRespository.Instance().findAt(data.Article_Id).withGraphFetched('descriptionArticles')
            if (checkarticle.descriptionArticles.length >= checkarticle.Duration) {
                throw 'Already write this day'
            }
            if (checkarticle.Duration < data.Day) {
                throw 'Day cannot greater than duration'
            }
            const result = await this.respository.graphInsert(data)
            return response(200, 'Success !!!', result)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async updateById(req, id) {
        try {
            const checkData = await this.respository.findAt(id).withGraphFetched('articles')
            if(!checkData) {
                return response(404, 'Not found')
            }
            if(req.userData.Role == 'Users') {
                if(req.userData.ID != checkData.articles.User_Id) {
                    return response(403, 'You don not have permission to access')
                }
            }
            const data = req.body
            if(data.Day) {
                await this.respository.update({Day: checkData.Day}, {Day: data.Day, Article_Id: checkData.Article_Id})
                await this.respository.updateById({Day: data.Day}, id)
            }
            const imageArticles = data.imageArticles
            if (data.imageArticles != undefined) {
                imageArticles.forEach(async element => {
                    await ImageArticleRespository.Instance().tableQuery().insertGraph(
                        [{
                            URL: element.URL,
                            Location: element.Location,
                            descriptionArticles: [{
                                ID: id
                            }]
                        }], {
                            relate: true
                        }
                    )
                });
            }
            data.imageArticles = undefined
            const update = await this.respository.updateById(data, id)
            return {
                status: 200,
                message: 'Success !!!',
                isUpdate: update
            }
        } catch (error) {
            console.log('UPDATE DESCRIPTION ARTICLE', error.toString());
            return response(400, 'Update failed !!!')
        }
    }
    async updateByArticleId(req, articleId) {
        try {
            const check = await ArticleRespository.Instance().findAt(articleId).withGraphFetched('descriptionArticles')
            if(!check) {
                return response(404, 'Not found')
            }
            if(req.userData.Role == 'Users') {
                if(req.userData.ID != check.User_Id) {
                    return response(403, 'You don not have permission to access')
                }
            }
            const data = req.body
            if(data.descriptions == undefined) throw 'Please send data to update'
            if(data.descriptions.length > data.Duration) {
                throw 'Duration is only ' + data.Duration + ' day'
            }
            let day = 1   
            let Day = 1          
            const element = data.descriptions
            for (let i = 0; i < element.length; i++) {
                if(element[i].ID != undefined) {
                    element[i].Day= day
                    element[i].ID= undefined
                    await this.respository.update(element[i], {Day, Article_Id: articleId})
                    day++
                    Day++
                }
                else {
                    if(day > check.Duration) throw 'Can not create article amount more than duration'
                    element[i].Day = day 
                    element[i].Article_Id = articleId
                    await this.respository.create(element[i])
                    day++
                }
            }
            return response(201, 'Success !!!')
        } catch (error) {
            console.log('UPDATE DESCRIPTION ARTICLE', error.toString());
            return response(400, error.toString())
        }
    }
}