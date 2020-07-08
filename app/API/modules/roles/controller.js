import BaseController from '../../core/Controller'
import RoleService from "./service"
export default class RoleController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return RoleService.Instance();  
    }
  
}