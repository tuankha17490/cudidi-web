import BaseRespository from '../../core/Repository'
import Comment from "../../../Models/Articles/Comments"
export default class CommentRespository extends BaseRespository {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getTable() {
        return Comment;
    }
}