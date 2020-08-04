import BaseController from '../../core/Controller'
import ArticleService from "./service"
export default class ArticleController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return ArticleService.Instance();  
    }
    uploadImage(req) {
        return this.service.uploadImage(req)
    }
    updateImage(req) {
        return this.service.updateImage(req)
    }
    getInformation(condition) {
        return this.service.getInformation(condition, 'users')
    }
    updateById(req) {
        return this.service.updateById(req);
    }
    updateBySlug(req) {
        return this.service.updateBySlug(req);
    }
    getList(page, limit) {
        return this.service.getList(page, limit, 'users')
    }
    search(data,page, limit) {
        return this.service.search(data,page,limit,'users', ['Title', 'Location'])
    }
    getListWithUser(userID, page, limit) {
        return this.service.getListWithUser(userID, page, limit)
    }
    getListRelation(req) {
        return this.service.getListRelation(req)
    }
}