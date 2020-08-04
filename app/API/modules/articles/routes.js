import express from "express"
const router = express.Router();
import authorization from "../../../Middleware/Authorization"
import ArticleController from "./controller"
import multer from "../../../Config/multer"
import ArticleValidator from "./validator"
import Permissions from "../../../Middleware/Permission"
const permissions = new Permissions()
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

router.get('/:page&:limit',authorization,permissions.setModuleArticle, permissions.GetList, (req, res) => {
    try {
        controller.getList(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_ARTICLE_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})

router.get('/search/:page&:limit',authorization,permissions.setModuleArticle, permissions.Search, (req, res) => {
    try {
        controller.search(req.query.data,req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_SEARCH_ARTICLE');
        return res.status(200).json(error)
    }
})

router.get('/:userID/:page&:limit',authorization, (req, res) => {
    try {
        controller.getListWithUser(req.params.userID,req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_ARTICLE_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})
router.get('/description/:articleSlug',(req, res) => {
    try {
        controller.getListWithSlug(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_ARTICLE_LIST');
        return res.status(200).json(error)
    }
})

router.get('/relation/:articleSlug',(req, res) => {
    try {
        controller.getListRelation(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_ARTICLE_LIST');
        return res.status(200).json(error)
    }
})

router.post('/create',authorization,permissions.setModuleArticle, permissions.Create,validator.createTask, (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_ARTICLE');
        return res.status(200).json(error)
    }
})

router.get('/:id',authorization, (req, res) => {
    try {
        controller.getInformation({ID:req.params.id}).then(result => {return res.status(200).json(result)});
    } catch (error) {
        console.log('CONTROLLER_GET_INFORMATION_OF_ARTICLE')
        return res.status(200).json(error)
    }
})

router.delete('/:id',authorization,permissions.setModuleArticle, permissions.Delete, (req, res) => {
    try {
        controller.deleteSoft({ID: req.params.id}).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_USER')
        return res.status(200).json(error)
    }
})
router.put('/update-image/:articleSlug',authorization, multer.single('image'), (req, res) => {
    try {
        controller.updateImage(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_ARTICLE_UPLOAD_IMAGE')
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

// router.put('/:id',authorization,permissions.setModuleArticle, permissions.Update, validator.updateTask, (req, res) => {
//     try {
//         controller.updateById(req).then(result => {return res.status(201).json(result)})
//     } catch (error) {
//         console.log('CONTROLLER_UPDATE_ARTICLE')
//         return res.status(200).json(error)
//     }
   
// })
router.put('/:articleSlug',authorization,permissions.setModuleArticle, permissions.Update, validator.updateTask, (req, res) => {
    try {
        controller.updateBySlug(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_ARTICLE')
        return res.status(200).json(error)
    }
   
})

export default router;