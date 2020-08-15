import express from "express"
const router = express.Router();
import UserController from "../modules/user/controller"
import UserValidator from "../modules/user/validator"
// import passport from "../../Services/passport"
const controller = new UserController()
const validator = new UserValidator()

router.post('/login', (req, res) => {
    try {
        controller.login(req.body).then(result => {
            return res.status(200).json(result)
        })
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.status(200).json(error)
    }
})

router.post('/register', validator.registerTask, (req, res) => {
    try {
        controller.create(req.body).then(result => {
            console.log('asdasdasd');
            return res.status(201).json(result)
        })
    } catch (error) {
        console.log('CONTROLLER_REGISTER_USER')
        return res.status(200).json(error)
    }
})

router.post('/social/login', (req, res) => {
    try {
        controller.loginSocial(req.body).then(result => {
            return res.status(201).json(result)
        })
    } catch (error) {
        console.log('CONTROLLER_REGISTER_USER')
        return res.status(200).json(error)
    }
})


// router.get('/login/google', passport.authenticate('google', {
//     scope: ['profile', 'email' ]
// }))

// router.post('/login/google',passport.authenticate('googleToken', {session: false}))

// router.get('/login/facebook', passport.authenticate('facebook', {
//     scope: ['profile', 'email' ]
// }))

// router.get('/login/facebook/callback',passport.authenticate('facebook', {session: false}), async (req, res) => {
//     return res.status(200).json(req.user)
// })

export default router