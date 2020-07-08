import express from "express"
const router = express.Router();
import UserController from "./controller"
import { json } from "body-parser";
import authorization from "../../../Middleware/check_authorize"
const controller = new UserController()

router.get('/',authorization,(req, res) => {
    try {
        controller.getList().then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.json({error: error.toString()})
    }
})
router.get('/login',(req, res) => {
    try {
        console.log(req.params)
        controller.login(req.body).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.json({error: error.toString()})
    }
})

router.post('/register',(req, res) => {
    try {
        controller.create(req.body).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_REGISTER_USER')
        return res.json({error: error.toString()})
    }
})
router.get('/logout', (req, res) => {
    try {
        controller.logout(req.headers.authorization).then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_LOGOUT_USER')
        return res.json({error: error.toString()})
    }
})

router.get('/:id', (req, res) => {
    try {
        controller.getInforById(req.params.id).then(result => {return res.json(result)});
    } catch (error) {
        console.log('CONTROLLER_GET_INFORMATION_OF_USER')
        return res.json({error: error.toString()})
    }
})

router.put('/:id',  (req, res) => {
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


router.delete('/:id', (req, res) => {
    try {
        controller.deleteById(req.params.id).then(result => {return res.json({message: 'Delete success !!!', idIsDeleted: result})})
    } catch (error) {
        console.log('CONTROLLER_DELETE_USER')
        return json(error)
    }
})



export default router;
