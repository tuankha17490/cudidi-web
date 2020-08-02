import express from "express"
const router = express.Router()
import RateController from "./controller"
const controller = new RateController()
import authorization from "../../../Middleware/Authorization"


router.post('/create',authorization, (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_DESCRIPTION');
        return res.status(200).json(error)
    }
})



export default router