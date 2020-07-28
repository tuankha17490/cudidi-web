import Model from '../Schema'
import Tours from './Tours'
export default class Bookings extends Model {
    static get tableName() {
        return 'Bookings'
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
