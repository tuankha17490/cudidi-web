import DescriptionArticleRespository from "./respository"
import ArticleRespository from "../articles/respository"
import response from "../../../Util/Response"
import BaseServices from '../../core/Service';
export default class DescriptionArticleService extends BaseServices {
    static _Instance;
    static Instance() {
        if(!this._Instance) {
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
            if(checkarticle.descriptionArticles.length >= data.Day) {
                throw 'Already write this day'
            }
            if(checkarticle.Duration < data.Day) {
                throw 'Day cannot greater than duration'
            }
            const result = await this.respository.graphInsert(data)
            return response(200, 'Success !!!', result)
        } catch (error) {
            return response(400, error.toString())
        }
    }
}