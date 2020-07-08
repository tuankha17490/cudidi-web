import Model from '../Schema'
import Tours from './Tours'
export default class Bookings extends Model {
    static get tableName() {
        return 'Bookings'
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
                    from: 'Bookings.Tour_Id',
                    to: 'Tours.ID'
                }
            }
        }
    }
}
