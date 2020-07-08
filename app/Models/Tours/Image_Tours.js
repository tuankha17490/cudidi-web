import Model from '../Schema' 
import Description_Tours from './Description_Tours'
export default class Image_Tours extends Model {
    static get tableName() {
        return 'Image_Tours'
    }
    static get idColumn() {
        return 'ID'
    }
    static get relationMappings() {
        return {
            description_tours: {
                relation: Model.ManyToManyRelation,
                modelClass: Description_Tours,
                join: {
                    from: 'Image_Tours.ID',
                    through: {
                        from: 'Description_Img_Tour.Tour_Id',
                        to: 'Description_Img_Tour.Description_Id'
                    },
                    to: 'Description_Tours.ID'
                }
            }
        }
    }
}
