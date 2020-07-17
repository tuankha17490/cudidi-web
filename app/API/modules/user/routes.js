import express from "express"
const router = express.Router();
import UserController from "./controller"
import authorization from "../../../Middleware/check_authorize"
import UserValidator from "./validator"
import multer from "../../../Config/multer"
const controller = new UserController()
const validator = new UserValidator()

router.get('/me',authorization,(req, res) => {
    try {
        controller.getMe(req.userData).then(result => {return res.json({result})})
    } catch (error) {
        console.log('CONTROLLER_GET_MY_USER');
        return res.json({error: error.toString()})
    }
})
router.get('/lazy-load-list/:lastId&:limit',(req, res) => {
    try {
        controller.getListLazyLoad(req.params.lastId, req.params.limit).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.json({error: error.toString()})
    }
})

router.get('/:page&:limit',authorization, (req, res) => {
    try {
        controller.getList(req.params.page,req.params.limit).then(result => {return res.json({result})})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST_PAGINATION');
        return res.json({error: error.toString()})
    }
})
router.get('/:id',authorization, (req, res) => {
    try {
        controller.getInforById(req.params.id).then(result => {return res.json(result)});
    } catch (error) {
        console.log('CONTROLLER_GET_INFORMATION_OF_USER')
        return res.json({error: error.toString()})
    }
})
router.post('/check-password', authorization, (req, res) => {
    try {
        controller.passwordConfirm(req).then(result => {return res.json(result)})
    } catch (error) {
        return res.json({error: error.toString()})
    }
})
router.put('/upload-avatar',authorization,multer.single('avatar'),validator.uploadImage, (req, res) => {
    try {
        controller.uploadAvatar(req).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPLOAD_AVATAR')
        return res.json({error: error.toString()})
    }
})


router.put('/:id',authorization,validator.updateTask,  (req, res) => {
    try {
        controller.updateUserById(req, req.params.id).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_USER')
        return res.json({error: error.toString()})
    }
   
})

router.delete('/:id',authorization, (req, res) => {
    try {
        controller.deleteById(req.params.id).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_USER')
        return res.json({error: error.toString()})
    }
})



export default router;
