import express from 'express'
const router = express.Router()
import authorization from "../../../Middleware/Authorization"
import DescriptionArticleController from "./controller"
import DescriptionArticleValidator from "./validator"
const controller = new DescriptionArticleController()
const validator = new DescriptionArticleValidator()


router.post('/create',authorization,validator.createTask, (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_DESCRIPTION');
        return res.status(200).json(error)
    }
})

router.get('/:page&:limit',authorization, (req, res) => {
    try {
        controller.getList(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_DESCRIPTION_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})


router.put('/:id',authorization,  (req, res) => {
    try {
        controller.updateUserById(req, req.params.id).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_DESCRIPTION')
        return res.status(200).json(error)
    }
   
})
router.delete('/:id',authorization, (req, res) => {
    try {
        controller.deleteById(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_DESCRIPTION')
        return res.status(200).json(error)
    }
})


export default router