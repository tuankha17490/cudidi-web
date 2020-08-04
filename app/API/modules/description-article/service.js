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
            console.log(checkarticle);
            if (checkarticle.descriptionArticles.length >= data.Day) {
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
            // const checkData = await this.respository.findAt(id)
            // if(!checkData) {
            //     return response(404, 'Not found')
            // }
            // if(req.userData.Role == 'Users') {
            //     if(req.userData.ID != ) {
            //         return response(403, 'You don not have permission to access')
            //     }
            // }
            const data = req.body
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

    
}