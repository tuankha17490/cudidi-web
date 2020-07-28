import express from "express"
const router = express.Router();
import authorization from "../../../Middleware/Authorization"
import ArticleController from "./controller"
import multer from "../../../Config/multer"
import ArticleValidator from "./validator"
const controller = new ArticleController()
const validator = new ArticleValidator()

router.get('/lazy-load-list/:lastId&:limit',(req, res) => {
    try {
        controller.getListLazyLoad(req.params.lastId, req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.status(200).json(error)
    }
})

router.get('/:page&:limit',authorization, (req, res) => {
    try {
        controller.getList(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_ARTICLE_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})

router.post('/create',authorization,validator.createTask, (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_ARTICLE');
        return res.status(200).json(error)
    }
})




router.delete('/:id',authorization, (req, res) => {
    try {
        controller.deleteBySlug(req.params.id).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_ARTICLE')
        return res.status(200).json(error)
    }
})

router.post('/upload-image',authorization, multer.single('image'), (req, res) => {
    try {
        controller.uploadImage(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_ARTICLE_UPLOAD_IMAGE')
        return res.status(200).json(error)
    }
})

router.put('/:id',authorization,  (req, res) => {
    try {
        controller.updateUserById(req, req.params.id).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_ARTICLE')
        return res.status(200).json(error)
    }
   
})


export default router;