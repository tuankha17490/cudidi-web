import Model from '../Schema' 
import Tours from './Tours'
export default class Rules extends Model {
    static get tableName() {
        return 'Rules'
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
                    from: 'Rules.Tour_Id',
                    to: 'Tours.ID'
                }
            }
        }
    }
}
