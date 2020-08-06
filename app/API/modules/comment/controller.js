import BaseController from '../../core/Controller'
import CommentService from "./service"
export default class CommentController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return CommentService.Instance();  
    }
    createReply(req) {
        return this.service.createReply(req)
    }
    getListReply(replyId, lastId) {
        return this.service.getListReply(replyId, lastId)
    }
    getListLazyLoad(lastId, limit, articleId) {
        return this.service.getListLazyLoad(lastId, limit, articleId)
    }
}   