import Model from '../Schema'
import Users from "../Users/Users";
import Followings from "./Followings";
import Rates_Articles from "./Rate_Articles";
import Comments from "./Comments";
import Description_Articles from "./Description_Articles"
export default class Articles extends Model {
    static get tableName() {
        return 'Articles'
    }
    static get idColumn() {
        return 'ID'
    }
    async $beforeInsert() {
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    async $beforeUpdate() {
        this.updated_at = new Date()
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
            rateArticles: {
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
            descriptionArticles: {
                relation: Model.HasManyRelation,
                modelClass: Description_Articles,
                join: {
                    from: 'Articles.ID',
                    to: 'Description_Articles.Article_Id'
                }
            }
        }
    }
}
