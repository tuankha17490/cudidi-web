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
    constructor() {
        super()
    }
    getTable() {
        return Users;
    }
    getByMapping(condition, a,b,c) {
        return super.getBy(condition).innerJoin(a,b,c)
    }
    
}