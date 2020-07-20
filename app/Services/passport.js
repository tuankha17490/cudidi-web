import passport from "passport"
import {Strategy} from "passport-google-oauth20"
import dotenv from "dotenv"
import process from "process"
import UserService from "../API/modules/user/service"
const service = new UserService()
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
passport.use(new Strategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/login/google/callback'
}, service.loginByGoogle))

export default passport