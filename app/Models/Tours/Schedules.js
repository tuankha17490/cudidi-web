import Model from '../Schema' 
import Tours from './Tours'
export default class Schedules extends Model {
    static get tableName() {
        return 'Schedules'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() {
        return {
            tours: {
                relation: Model.ManyToManyRelation,
                modelClass: Tours,
                join: {
                    from: 'Schedules.ID',
                    through: {
                        from: 'Tour_Schedule.Schedule_Id',
                        to: 'Tour_Schedule.Tour.Id'
                    },
                    to: 'Tours.ID'
                }
            }
        }
    }
}
