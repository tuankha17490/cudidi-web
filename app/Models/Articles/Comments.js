import Model from '../Schema'
import Users from '../Users/Users'
import Articles from './Articles'
export default class Comments extends Model {
    static get tableName() {
        return 'Comments'
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
                    from: 'Comments.User_Id',
                    to: 'Users.ID'
                }
            },
            articles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Articles,
                join: {
                    from: 'Comments.Article_Id',
                    to: 'Articles.ID'
                }
            },
            parents: {
                relation: Model.HasManyRelation,
                modelClass: Comments,
                join: {
                    from: 'Comments.ID',
                    to: 'Comments.Reply_Id'
                }
            },
            child: {
                relation: Model.BelongsToOneRelation,
                modelClass: Comments,
                join: {
                    from: 'Comments.Reply_ID',
                    to: 'Comments.ID'
                }
            }
        }
    }
}
