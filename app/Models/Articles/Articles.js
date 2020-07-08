import Model from '../Schema'
import Users from "../Users/Users";
import Followings from "./Followings";
import Rates_Articles from "./Rate_Articles";
import Comments from "./Comments";
export default class Articles extends Model {
    static get tableName() {
        return 'Articles'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() { 
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'Articles.User_Id',
                    to: 'Users.ID'
                }
            },
            followings: {
                relation: Model.HasManyRelation,
                modelClass: Followings,
                join: {
                    from: 'Articles.ID',
                    to: 'Followings.Article_Id'
                }
            },
            rates_articles: {
                relation: Model.HasManyRelation,
                modelClass: Rates_Articles,
                join: {
                    from: 'Articles.ID',
                    to: 'Rate_Articles.Article_Id'
                }
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comments,
                join: {
                    from: 'Articles.ID',
                    to: 'Comments.Article_Id'
                }
            },
        }
    }
}
