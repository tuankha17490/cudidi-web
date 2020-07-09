import express from "express"
const router = express.Router();
import UserController from "./controller"
import authorization from "../../../Middleware/check_authorize"
import UserValidator from "./validator"
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

router.put('/:id',authorization,validator.updateTask,  (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const id = req.params.id;
        controller.updateById(data, id).then(result => {return res.json({message: 'Update Success !!!'})})
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
