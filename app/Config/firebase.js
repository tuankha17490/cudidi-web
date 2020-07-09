import process from "process"
import dotenv from "dotenv"
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
export default function(app) {
    app.use(async (req, res, next) => {
        res.redirectBack = () => {
            const backURL = req.header('Referer') || '/';
            return res.redirect(backURL);
          };
          res.locals.firebaseApiKey = process.env.FIREBASE_API_KEY;
          res.locals.firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
          res.locals.firebaseSenderId = process.env.FIREBASE_SENDER_ID;
          res.locals.firebaseAppId = process.env.FIREBASE_APP_ID;
          next();
    })
}