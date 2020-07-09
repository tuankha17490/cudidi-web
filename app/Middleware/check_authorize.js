import jwt from "jsonwebtoken"
import process from "process"
import dotenv from "dotenv"
dotenv.config({
    silent: process.env.NODE_ENV === 'production'
});
export default async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Authorize failed !!!',
            error
        })
    }
}