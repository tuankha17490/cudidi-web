import express from "express"
const router = express.Router();
import UserController from "../modules/user/controller"
import UserValidator from "../modules/user/validator"
const controller = new UserController()
const validator = new UserValidator()

router.post('/login',(req, res) => {
    try {
        controller.login(req.body).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.json({error: error.toString()})
    }
})

router.post('/register',validator.registerTask,(req, res) => {
    try {
        controller.create(req.body).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_REGISTER_USER')
        return res.json({error: error.toString()})
    }
})

export default router