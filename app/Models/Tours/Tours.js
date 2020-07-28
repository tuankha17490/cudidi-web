import Model from '../Schema' 
import Bookings from './Bookings'
import Rules from './Rules'
import Policies from './Policies'
import Schedules from './Schedules'
import Description_Tours from './Description_Tours'
export default class Tours extends Model {
    static get tableName() {
        return 'Tours'
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
            bookings: {
                relation: Model.HasManyRelation,
                modelClass: Bookings,
                join: {
                    from: 'Tours.ID',
                    to: 'Bookings.Tour_Id'
                }
            },
            rules: {
                relation: Model.BelongsToOneRelation,
                modelClass: Rules,
                join: {
                    from: 'Tours.ID',
                    to: 'Rules.Tour_Id'
                }
            },
            policies: {
                relation: Model.BelongsToOneRelation,
                modelClass: Policies,
                join: {
                    from: 'Tours.ID',
                    to: 'Policies.Tour_Id'
                }
            },
            schedules: {
                relation: Model.ManyToManyRelation,
                modelClass: Schedules,
                join: {
                    from: 'Tours.ID',
                    through: {
                        from: 'Tour_Schedule.Tour_Id',
                        to: 'Tour_Schedule.Schedule_Id'
                    },
                    to: 'Schedules.ID'
                }
            },
            descriptionTours: {
                relation: Model.HasManyRelation,
                modelClass: Description_Tours,
                join: {
                    from: 'Tours.ID',
                    to: 'Description_Tours.Tour_Id'
                }
            }
        }
    }
}
