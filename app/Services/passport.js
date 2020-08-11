import passport from "passport"
import GooglePlusTokenStrategy from "passport-google-plus-token"
import {Strategy as facebookStrategy} from "passport-facebook"
import dotenv from "dotenv"
import process from "process"
import UserService from "../API/modules/user/service"
const service = new UserService()
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    console.log('access token', accessToken);
    console.log('refresh token', refreshToken);
    console.log('profile', profile);
}))


passport.use(new facebookStrategy({
    clientID: process.env.facebookClientID,
    clientSecret: process.env.facebookClientSecret,
    callbackURL: process.env.facebookCallBackURL
}, service.loginByFacebook))

export default passport