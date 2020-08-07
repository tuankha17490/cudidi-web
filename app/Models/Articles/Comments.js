import Model from '../Schema'
import Users from '../Users/Users'
import Articles from './Articles'
import {raw} from "objection"
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
    async $afterInsert() {
        await Articles.query().where({ID: this.Article_Id}).patch({CommentAmount: raw('CommentAmount + 1')})
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
            childs: {
                relation: Model.HasManyRelation,
                modelClass: Comments,
                join: {
                    from: 'Comments.ID',
                    to: 'Comments.Reply_Id'
                }
            },
            parents: {
                relation: Model.BelongsToOneRelation,
                modelClass: Comments,
                join: {
                    from: 'Comments.Reply_Id',
                    to: 'Comments.ID'
                }
            }
        }
    }
}
