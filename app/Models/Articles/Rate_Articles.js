import Model from "../Schema";
import Users from "../Users/Users";
import Articles from "./Articles";
export default class Rate_Articles extends Model {
    static get tableName() {
        return 'Rate_Articles'
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
                    from: 'Rate_Articles.User_Id',
                    to: 'Users.ID'
                }
            },
            articles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Articles,
                join: {
                    from: 'Rate_Articles.Article_Id',
                    to: 'Articles.ID'
                }
            }
        }
    }
}
