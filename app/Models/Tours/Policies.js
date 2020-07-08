import Model from '../Schema' 
import Tours from './Tours'
export default class Policies extends Model {
    static get tableName() {
        return 'Policies'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() {
        return {
            tours: {
                relation: Model.BelongsToOneRelation,
                modelClass: Tours,
                join: {
                    from: 'Policies.Tour_Id',
                    to: 'Tours.ID'
                }
            }
        }
    }
}
