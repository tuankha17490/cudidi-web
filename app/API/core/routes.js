import express from "express"
const router = express.Router();
import UserController from "../modules/user/controller"
import UserValidator from "../modules/user/validator"
import passport from "../../Services/passport"
const controller = new UserController()
const validator = new UserValidator()

router.post('/login', (req, res) => {
    try {
        controller.login(req.body).then(result => {
            return res.status(200).json(result)
        })
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.status(400).json(error)
    }
})

router.post('/register', validator.registerTask, (req, res) => {
    try {
        controller.create(req.body).then(result => {
            return res.status(201).json(result)
        })
    } catch (error) {
        console.log('CONTROLLER_REGISTER_USER')
        return res.status(400).json(error)
    }
})

router.get('/login/google', passport.authenticate('google', {
    scope: ['profile', 'email' ]
}))

router.get('/login/google/callback',passport.authenticate('google', {session: false}), async (req, res) => {
    return res.status(200).json(req.user)
})

export default router