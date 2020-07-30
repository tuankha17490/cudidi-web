import BaseRespository from '../../core/Repository'
import ImageArticle from "../../../Models/Articles/Image_Articles"
export default class ImageArticleRespository extends BaseRespository {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getTable() {
        return ImageArticle;
    }
}