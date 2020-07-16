import UserRoute from "../API/modules/user/routes"
import ArticleRoute from "../API/modules/articles/routes"
import BaseRoute from "../API/core/routes"
export default function(app) {
    app.use('/',BaseRoute)
    app.use('/user',UserRoute)
    app.use('/article',ArticleRoute)
}