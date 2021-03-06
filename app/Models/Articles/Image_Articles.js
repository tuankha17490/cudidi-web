import Model from "../Schema";
import Descriptions_Articles from "./Description_Articles";
export default class Image_Articles extends Model {
    static get tableName() {
        return 'Image_Articles'
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
            descriptionArticles: {
                relation: Model.ManyToManyRelation,
                modelClass: Descriptions_Articles,
                join: {
                    from: 'Image_Articles.ID',
                    through: {
                        from: 'Description_Img_Article.Image_Id',
                        to: 'Description_Img_Article.Description_Id'
                    },
                    to: 'Description_Articles.ID'
                }
            },
        }
    }
}
