import RateRespository from "./respository"
import BaseServices from '../../core/Service';
import response  from "../../../Util/Response";
export default class RateService extends BaseServices {
    static _Instance;
    static Instance() {
        if(!this._Instance) {
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
            if(data.Rate == undefined) {
                return response(400,'Rate can not undefine') 
            }
            if(data.Rate > 5) {
                return response(400,'Rate must be less than 5') 
            }
            const check = await this.respository.getBy({User_Id: req.userData.ID, Article_Id: req.body.articleID})
            if(check) {
               await this.respository.update({Rate: data.Rate, Article_Id: req.body.articleID}, {User_Id: req.userData.ID, Article_Id: req.body.articleID})
               return response(201, 'Success !!!')
            }
            await this.respository.create({User_Id: req.userData.ID, Article_Id: req.body.articleID, Rate: data.Rate})
            return response(201, 'Success !!!')
        } catch (error) {
            console.log('CREATE_RATING_ARTICLE', error.toString())
            return response(400, 'Rate failed')
        }
    }
   
}