import RateRespository from "./respository"
import BaseServices from '../../core/Service';
import response from "../../../Util/Response";
import ArticleRespository from "../../modules/articles/respository"
export default class RateService extends BaseServices {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return RateRespository.Instance();
    }
    async create(req) {
        try {
            const data = req.body
            if (data.Rate == undefined) {
                return response(400, 'Rate can not undefine')
            }
            if (data.Rate > 5) {
                return response(400, 'Rate must be less than 5')
            }
            let result = 0
            const check = await this.respository.getBy({
                User_Id: req.userData.ID,
                Article_Id: req.body.Article_Id
            })
            if (check) {
                result = await check.$query().patchAndFetch({
                    Rate: data.Rate,
                    Article_Id: req.body.Article_Id
                })
            } else {
                result = await this.respository.create({
                    User_Id: req.userData.ID,
                    Article_Id: req.body.Article_Id,
                    Rate: data.Rate
                })
            }
            const temp = await ArticleRespository.Instance().tableQuery().select('AvgRate').where({
                ID: result.Article_Id
            })
            result.AvgRate = temp[0].AvgRate
            return response(201, 'Success !!!', result)
        } catch (error) {
            console.log('CREATE_RATING_ARTICLE', error.toString())
            return response(400, error.toString())
        }
    }

}