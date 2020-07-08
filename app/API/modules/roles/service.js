import RoleRespository from "./respository"
import BaseServices from '../../core/Service';
export default class RoleService extends BaseServices {
    static _Instance;
    static Instance() {
        if(!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return RoleRespository.Instance();
    }
   
}