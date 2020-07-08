import Model from '../Schema' 
import Modules from './Module'
import Methods from './Method'
import Roles from './Roles'
export default class Permissions extends Model {
    static get tableName() {
        return 'Permissions'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() {
        return {
            modules: {
                relation: Model.HasManyRelation,
                modelClass: Modules,
                join: {
                    from: 'Permissions.Module_Id',
                    to: 'Modules.ID'
                }
            },
            methods: {
                relation: Model.HasManyRelation,
                modelClass: Methods,
                join: {
                    from: 'Permissions.Method_Id',
                    to: 'Methods.ID'
                }
            },
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Roles,
                join: {
                    from: 'Permissions.ID',
                    through: {
                        from: 'Role_Permission.Permission_Id',
                        to: 'Role_Permission.Role_Id'
                    },
                    to: 'Roles.ID'
                }
            }
        }
    }
}