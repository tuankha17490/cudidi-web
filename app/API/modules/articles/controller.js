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
    
}