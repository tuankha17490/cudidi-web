import UserRoute from "../API/modules/user/routes"
import ArticleRoute from "../API/modules/articles/routes"
import DescriptionArticleRoute from "../API/modules/description-article/routes"
import RateRoute from "../API/modules/rating/routes"
import CommentRoute from "../API/modules/comment/routes"
import BaseRoute from "../API/core/routes"
export default function(app) {
    app.use('/',BaseRoute)
    app.use('/user',UserRoute)
    app.use('/article',ArticleRoute)
    app.use('/rating',RateRoute)
    app.use('/comment',CommentRoute)
    app.use('/description-article',DescriptionArticleRoute)
}