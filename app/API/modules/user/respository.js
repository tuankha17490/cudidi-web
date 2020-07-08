import BaseRespository from '../../core/Repository'
import Users from "../../../Models/Users/Users"
export default class UserRespository extends BaseRespository {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getTable() {
        return Users;
    }
}