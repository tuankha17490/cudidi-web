// import process from "process"
// import dotenv from "dotenv"
// dotenv.config({ silent: process.env.NODE_ENV === 'production' });
// export default function(app) {
//     app.use(async (req, res, next) => {
//         res.redirectBack = () => {
//             const backURL = req.header('Referer') || '/';
//             return res.redirect(backURL);
//           };
//           res.locals.firebaseApiKey = process.env.FIREBASE_API_KEY;
//           res.locals.firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
//           res.locals.firebaseSenderId = process.env.FIREBASE_SENDER_ID;
//           res.locals.firebaseAppId = process.env.FIREBASE_APP_ID;
//           res.locals.firebaseStorageBucket = process.env.FIREBASE_STORAGE_BUCKET;
//           next();
//     })
// }

// import firebase from "firebase"

// const firebaseConfig = {
//     apiKey: "AIzaSyCuBsDdTaD-nFpXa6eUsqgvid0gls3uTes",
//     authDomain: "cudidiweb.firebaseapp.com",
//     databaseURL: "https://cudidiweb.firebaseio.com",
//     projectId: "cudidiweb",
//     storageBucket: "cudidiweb.appspot.com",
//     messagingSenderId: "244429766604",
//     appId: "1:244429766604:web:4ecee2bb6eb1a95d9a2769",
//     measurementId: "G-7DE2VKDHHF"
// };

// firebase.initializeApp(firebaseConfig);
// export default firebase;
import admin from "firebase-admin";

import serviceAccount from "../../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cudidiweb.firebaseio.com",
  storageBucket: "cudidiweb.appspot.com"
});
export default admin.storage().bucket()
