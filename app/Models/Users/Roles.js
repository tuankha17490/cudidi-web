import Model from '../Schema' 
import Permissions from './Permission'
import Users from "./Users";
export default class Roles extends Model {
    static get tableName() {
        return 'Roles'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() {
        return {
            permissions: {
                relation: Model.ManyToManyRelation,
                modelClass: Permissions,
                join: {
                    from:'Roles.ID',
                    through: {
                        from: 'Role_Permission.Role_Id',
                        to: 'Role_Permission.Permission_Id'
                    },
                    to: 'Permissions.ID'
                }
            },
            users: {
                relation: Model.HasManyRelation,
                modelClass: Users,
                join: {
                    from: 'Roles.ID',
                    to: 'Users.Role_Id'
                }
            }
        }
    }
}