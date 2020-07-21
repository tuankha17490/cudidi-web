import passport from "passport"
import {Strategy as googleStrategy} from "passport-google-oauth20"
import {Strategy as facebookStrategy} from "passport-facebook"
import dotenv from "dotenv"
import process from "process"
import UserService from "../API/modules/user/service"
const service = new UserService()
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
passport.use(new googleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/login/google/callback'
}, service.loginByGoogle))


passport.use(new facebookStrategy({
    clientID: process.env.facebookClientID,
    clientSecret: process.env.facebookClientSecret,
    callbackURL: process.env.facebookCallBackURL
}, service.loginByFacebook))

export default passport