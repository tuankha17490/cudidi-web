import Model from '../Schema' 
import Tours from './Tours'
import Image_Tours from './Image_Tours'
export default class Description_Tours extends Model {
    static get tableName() {
        return 'Description_Tours'
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
                    from: 'Description_Tours.Tour_Id',
                    to: 'Tours.ID'
                }
            },
            imageTours: {
                relation: Model.ManyToManyRelation,
                modelClass: Image_Tours,
                join: {
                    from: 'Description_Tours.ID',
                    through: {
                        from: 'Description_Img_Tour.Description_Id',
                        to: 'Description_Img_Tour.Tour_Id'
                    },
                    to: 'Image_Tours.ID'
                }
            }
        }
    }
}
