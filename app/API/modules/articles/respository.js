import BaseRespository from '../../core/Repository'
import Article from "../../../Models/Articles/Articles"
export default class ArticleRespository extends BaseRespository {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    constructor() {
        super()
    }
    getTable() {
        return Article;
    }
    
}