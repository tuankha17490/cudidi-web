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
        const avgRate = await Rate_Articles.query().where({Article_Id: this.Article_Id}).avg('Rate as value')
        await Articles.query().where({ID: this.Article_Id}).patch({RateAmount: raw('RateAmount + 1'), AvgRate: avgRate[0].value})
    }
    async $afterUpdate() {
        const avgRate = await Rate_Articles.query().where({Article_Id: this.Article_Id}).avg('Rate as value')
        await Articles.query().where({ID: this.Article_Id}).patch({AvgRate: avgRate[0].value})
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
