import Model from '../Schema' 
import Tours from './Tours'
export default class Rules extends Model {
    static get tableName() {
        return 'Rules'
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
                    from: 'Rules.Tour_Id',
                    to: 'Tours.ID'
                }
            }
        }
    }
}
