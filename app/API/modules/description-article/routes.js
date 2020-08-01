import express from 'express'
const router = express.Router()
import authorization from "../../../Middleware/Authorization"
import DescriptionArticleController from "./controller"
import DescriptionArticleValidator from "./validator"
import Permissions from "../../../Middleware/Permission"
const permissions = new Permissions()
const controller = new DescriptionArticleController()
const validator = new DescriptionArticleValidator()


router.post('/create',authorization,permissions.setModuleDescription, permissions.Create,validator.createTask, (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_DESCRIPTION');
        return res.status(200).json(error)
    }
})

router.get('/:page&:limit',authorization,permissions.setModuleDescription, permissions.GetList, (req, res) => {
    try {
        controller.getList(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_DESCRIPTION_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})

router.get('/search/:page&:limit',authorization,permissions.setModuleDescription, permissions.Search, (req, res) => {
    try {
        controller.search(req.query.data,req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_SEARCH_DESCRIPTION');
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

router.put('/:id',authorization,permissions.setModuleDescription, permissions.Update, (req, res) => {
    try {
        controller.updateById(req, req.params.id).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_DESCRIPTION')
        return res.status(200).json(error)
    }
   
})
router.delete('/:id',authorization,permissions.setModuleDescription, permissions.Delete, (req, res) => {
    try {
        controller.deleteSoft({ID: req.params.id}).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_DESCRIPTION')
        return res.status(200).json(error)
    }
})


export default router