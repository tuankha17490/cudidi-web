import BaseRespository from '../../core/Repository'
import RateArticle from "../../../Models/Articles/Rate_Articles"
export default class RateRespository extends BaseRespository {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getTable() {
        return RateArticle;
    }
}