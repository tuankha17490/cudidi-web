import Model from '../Schema'
import Roles from './Roles'
import Followings from '../Articles/Followings'
import Rate_Articles from '../Articles/Rate_Articles'
import Comments from '../Articles/Comments' 
import Articles from '../Articles/Articles' 
export default class Users extends Model {
    static get tableName() {
        return 'Users'
    }
    static get idColumn() {
        return 'id'
    }
    // Modifiers are reusable query snippets that can be used in various places.
    static get Modifier() {
        return {
            searchByName(query, name) {
                // ......
            }
        }
    }
    // To do validate 
    static get jsonSchema() {

    }
    static get relationMappings() {

        return {
            roles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Roles,
                join: {
                    from: 'Users.Role_Id',
                    to: 'Roles.ID'
                }
            },
            rates_articles: {
                relation: Model.HasManyRelation,
                modelClass: Rate_Articles,
                join: {
                    from: 'Users.ID',
                    to: 'Rate_Articles.User_Id'
                }
            },
            followings: {
                relation: Model.HasManyRelation,
                modelClass: Followings,
                join: {
                    from: 'Users.ID',
                    to: 'Followings.User_Id'
                }
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comments,
                join: {
                    from: 'Users.ID',
                    to: 'Comments.User_Id'
                }
            },
            articles: {
                relation: Model.HasManyRelation,
                modelClass: Articles,
                join: {
                    from: 'Users.ID',
                    to: 'Articles.User_Id'
                }
            },
            bookings: {

            }
        }
    }
}