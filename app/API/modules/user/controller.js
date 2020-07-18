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
    uploadAvatar(req) {
        return this.service.uploadAvatar(req)
    }
    passwordConfirm(req) {
        return this.service.passwordConfirm(req)
    }
    getList(page, limit) {
        return this.service.getList(page, limit, 'roles', ['ID', 'FullName', 'Username', 'Email', 'Address', 'Avatar', 'PhoneNumber', 'BirthDay', 'Slug'])
    }
    getMe(decode) {
        return this.service.getMe(decode)
    }
    getListLazyLoad(lastId, limit) {
        return this.service.getListLazyLoad(lastId, limit,'roles', ['ID', 'FullName', 'Username', 'Email', 'Address', 'Avatar', 'PhoneNumber', 'BirthDay', 'Slug']);
    }
    updatePassword(req) {
        return this.service.updatePassword(req)
    }
    search(data) {
        return this.service.search(data, 'Username',['ID', 'FullName', 'Username', 'Email', 'Address', 'Avatar', 'PhoneNumber', 'BirthDay', 'Slug'])
    }
}