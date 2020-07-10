import BaseController from '../../core/Controller'
import UserService from "./service"
export default class UserController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return UserService.Instance();  
    }
    login(param) {
        return this.service.login(param);
    }
    updateUserById(data, id) {
        return this.service.updateUserById(data, id);
    }
    uploadAvatar(file, id) {
        return this.service.uploadAvatar(file, id)
    }
    passwordConfirm(password, id) {
        return this.service.passwordConfirm(password, id)
    }
}