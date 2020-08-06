import express from "express"
const router = express.Router()
import CommentController from "./controller"
const controller = new CommentController()
import authorization from "../../../Middleware/Authorization"
import CommentValidator from "./validator"
const validator = new CommentValidator()
import CommentPermission from "../../../Middleware/Permission"
const permissions = new CommentPermission()

router.post('/create',authorization,validator.commentTask, (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_COMMENT');
        return res.status(200).json(error)
    }
})

router.post('/reply/create',authorization,validator.commentTask, (req, res) => {
    try {
        controller.createReply(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_REPLY_COMMENT');
        return res.status(200).json(error)
    }
})

router.get('/lazy-load-list/:lastId&:limit&:articleId',(req, res) => {
    try {
        controller.getListLazyLoad(req.params.lastId, req.params.limit, req.params.articleId).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_COMMENT_LIST');
        return res.status(200).json(error)
    }
})

router.get('/reply/:replyId&:lastId',(req, res) => {
    try {
        controller.getListReply(req.params.replyId, req.params.lastId).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_COMMENT_LIST');
        return res.status(200).json(error)
    }
})

router.get('/:page&:limit',authorization,permissions.setModuleComment, permissions.GetList, (req, res) => {
    try {
        controller.getList(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_ARTICLE_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})

router.get('/search/:page&:limit',authorization,permissions.setModuleComment, permissions.Search, (req, res) => {
    try {
        controller.search(req.query.data,req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_SEARCH_ARTICLE');
        return res.status(200).json(error)
    }
})

router.get('/:id',authorization, (req, res) => {
    try {
        controller.getInformation({ID:req.params.id}).then(result => {return res.status(200).json(result)});
    } catch (error) {
        console.log('CONTROLLER_GET_INFORMATION_OF_DESCRIPTION_ARTICLE')
        return res.status(200).json(error)
    }
})

router.put('/:id',authorization,validator.commentTask, (req, res) => {
    try {
        controller.updateById(req, req.params.id).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_DESCRIPTION')
        return res.status(200).json(error)
    }
})
router.delete('/:id',authorization, (req, res) => {
    try {
        controller.deleteSoft({ID: req.params.id}).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_DESCRIPTION')
        return res.status(200).json(error)
    }
})



export default router