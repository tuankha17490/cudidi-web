import express from "express"
const router = express.Router();
import UserController from "./controller"
import authorization from "../../../Middleware/check_authorize"
import UserValidator from "./validator"
import multer from "../../../Config/multer"
const controller = new UserController()
const validator = new UserValidator()

router.get('/',authorization,(req, res) => {
    try {
        controller.getList().then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
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

router.put('/:id',multer.single('avatar'),authorization,validator.updateTask,  (req, res) => {
    try {
        controller.updateUserById(req, req.params.id).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_USER')
        return res.json({error: error.toString()})
    }
   
})


router.delete('/:id',authorization, (req, res) => {
    try {
        controller.deleteById(req.params.id).then(result => {return res.json({message: 'Delete success !!!', idIsDeleted: result})})
    } catch (error) {
        console.log('CONTROLLER_DELETE_USER')
        return res.json(error)
    }
})



export default router;
