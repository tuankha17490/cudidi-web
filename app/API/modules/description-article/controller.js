import BaseController from '../../core/Controller'
import DescriptionArticleService from "./service"
export default class DescriptionArticleController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return DescriptionArticleService.Instance();  
    }
    search(data,page, limit) {
        return this.service.search(data,page,limit,'imageArticles', ['Place'])
    }
    getList(page, limit) {
        return this.service.getList(page, limit, 'imageArticles')
    }
    getInformation(condition) {
        return this.service.getInformation(condition, 'imageArticles')
    }
    updateByArticleId(req, articleId) {
        return this.service.updateByArticleId(req, articleId)
    }
}