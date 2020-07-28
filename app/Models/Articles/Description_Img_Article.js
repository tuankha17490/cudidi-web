import Model from "../Schema";
import Image_Articles from "./Image_Articles";
import Description_Articles from "./Description_Articles";
export default class Description_Img_Articles extends Model {
    static get tableName() {
        return 'Description_Img_Article'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() {
        return {
            imageArticles: {
                relation: Model.HasManyRelation,
                modelClass: Image_Articles,
                join: {
                    from: 'Description_Img_Article.Image_Id',
                    to: 'Image_Articles.ID'
                }
            },
            descriptionArticles: {
                relation: Model.HasManyRelation,
                modelClass: Description_Articles,
                join: {
                    from: 'Description_Img_Article.Description_Id',
                    to: 'Description_Articles.ID'
                }
            }
        }
    }
}
