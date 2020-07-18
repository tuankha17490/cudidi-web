import express from "express"
const router = express.Router();
import authorization from "../../../Middleware/Authorization"
import ArticleController from "./controller"
const controller = new ArticleController()

router.get('/lazy-load-list/:lastId&:limit',(req, res) => {
    try {
        controller.getListLazyLoad(req.params.lastId, req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.status(400).json(error)
    }
})

router.get('/:page&:limit',authorization, (req, res) => {
    try {
        controller.getList(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST_PAGINATION');
        return res.status(400).json(error)
    }
})

router.post('/create',authorization, (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_ARTICLE');
        return res.status(400).json(error)
    }
})

router.delete('/:id',authorization, (req, res) => {
    try {
        controller.deleteBySlug(req.params.id).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_USER')
        return res.status(400).json(error)
    }
})


export default router;