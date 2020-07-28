import Model from "../Schema";
import Users from "../Users/Users";
import Articles from "./Articles";
export default class Followings extends Model {
    static get tableName() {
        return 'Followings'
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
                    from: 'Followings.User_Id',
                    to: 'Users.ID'
                }
            },
            articles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Articles,
                join: {
                    from: 'Followings.Article_Id',
                    to: 'Articles.ID'
                }
            }
        }
    }
}
