import BaseRespository from '../../core/Repository'
import Roles from "../../../Models/Users/Roles"
export default class RoleRespository extends BaseRespository {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getTable() {
        return Roles;
    }
}