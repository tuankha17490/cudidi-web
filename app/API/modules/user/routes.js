import express from "express"
const router = express.Router();
import UserController from "./controller"
import authorization from "../../../Middleware/Authorization"
import UserValidator from "./validator"
import multer from "../../../Config/multer"
import Permissions from "../../../Middleware/Permission"
import decode from "../../../Middleware/Decoded"
const permissions = new Permissions()
const controller = new UserController()
const validator = new UserValidator()

router.get('/me',authorization,(req, res) => {
    try {
        controller.getMe(req.userData).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_MY_USER');
        return res.status(200).json(error)
    }
})
router.get('/search/:page&:limit',authorization,permissions.setModuleUsers, permissions.Search, (req, res) => {
    try {
        controller.search(req.query.data,req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_SEARCH_USER');
        return res.status(200).json(error)
    }
})

// router.get('/lazy-load-list/:lastId&:limit',(req, res) => {
//     try {
//         controller.getListLazyLoad(req.params.lastId, req.params.limit).then(result => {return res.status(200).json(result)})
//     } catch (error) {
//         console.log('CONTROLLER_GET_USER_LIST');
//         return res.status(200).json(error)
//     }
// })

router.get('/article/:userSlug&:lastId&:limit',decode,(req, res) => {
    try {
        controller.getListWithSlug(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.status(200).json(error)
    }
})

router.get('/:page&:limit',authorization,permissions.setModuleUsers, permissions.GetList, (req, res) => {
    try {
        controller.getList(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})
router.get('/:id',authorization,permissions.setModuleUsers, permissions.Read, (req, res) => {
    try {
        controller.getInforById(req.params.id).then(result => {return res.status(200).json(result)});
    } catch (error) {
        console.log('CONTROLLER_GET_INFORMATION_OF_USER')
        return res.status(200).json(error)
    }
})
router.post('/check-password', authorization, (req, res) => {
    try {
        controller.passwordConfirm(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        return res.status(200).json(error)
    }
})
router.put('/update-password', authorization, (req, res) => {
    try {
        controller.updatePassword(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        return res.status(200).json(error)
    }
})
router.put('/upload-avatar',authorization,multer.single('avatar'),validator.uploadImage, (req, res) => {
    try {
        controller.uploadAvatar(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPLOAD_AVATAR')
        return res.status(200).json(error)
    }
})

router.put('/update-information',authorization,validator.updateTask, (req, res) => {
    try {
        controller.updateInformation(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_USER')
        return res.status(200).json(error)
    }
})
router.put('/:id',authorization,permissions.setModuleUsers, permissions.Update,validator.updateTask,  (req, res) => {
    try {
        controller.updateUserById(req, req.params.id).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_USER')
        return res.status(200).json(error)
    }
   
})
router.delete('/:id',authorization,permissions.setModuleUsers, permissions.Delete, (req, res) => {
    try {
        controller.deleteSoft(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_USER')
        return res.status(200).json(error)
    }
})



export default router;
