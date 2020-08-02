import Model from "../Schema";
import Users from "../Users/Users";
import Articles from "./Articles";
import {raw} from "objection"
export default class Rate_Articles extends Model {
    static get tableName() {
        return 'Rate_Articles'
    }
    static get idColumn() {
        return 'ID'
    }
    async $afterInsert() {
        const result = await Articles.query().where({ID: this.Article_Id}).patchAndFetch({RateAmount: raw('RateAmount + 1')})
        console.log('after insert',result);
        const avgRate = result.AvgRate*(result.RateAmount - 1) + this.Rate
    }
    static get relationMappings() {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'Rate_Articles.User_Id',
                    to: 'Users.ID'
                }
            },
            articles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Articles,
                join: {
                    from: 'Rate_Articles.Article_Id',
                    to: 'Articles.ID'
                }
            }
        }
    }
}
