import Model from "../Schema";
import Image_Articles from "./Image_Articles";
import Articles from "./Articles";
export default class Description_Articles extends Model {
    static get tableName() {
        return 'Description_Articles'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() {
        return {
            imageArticles: {
                relation: Model.ManyToManyRelation,
                modelClass: Image_Articles,
                join: {
                    from: 'Description_Articles.ID',
                    through: {
                        from: 'Description_Img_Article.Description_Id',
                        to: 'Description_Img_Article.Image_Id'
                    },
                    to: 'Image_Articles.ID'
                }
            },
            articles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Articles,
                join: {
                    from: 'Description_Articles.Article_Id',
                    to: 'Articles.ID'
                }
            }
        }
    }
}
