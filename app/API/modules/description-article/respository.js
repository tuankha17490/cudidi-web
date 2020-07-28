import BaseRespository from '../../core/Repository'
import DescriptionArticle from "../../../Models/Articles/Description_Articles"
export default class DescriptionArticleRespository extends BaseRespository {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getTable() {
        return DescriptionArticle;
    }
}