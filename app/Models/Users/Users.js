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
        return {
            type: 'object',
            required: ['Username', 'Password'],
            properties: {
                id: {
                    type: 'integer'
                },
                Username: {
                    type: "string",
                    minLength: 5,
                    maxLength: 30
                },
                Password: {
                    type: "string",
                    minLength: 6
                },
                FullName: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255
                },
                Email: {
                    type: "string",
                    format: "email"
                },
                BirthDay: {
                    type: 'string',
                    format: "date"
                },
                Address: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255
                },
                Avatar: {
                    type: "string"
                },
                PhoneNumber: {
                    type: "string",
                    minLength: 5,
                    maxLength: 15
                },
            },
        }
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