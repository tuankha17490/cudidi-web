import BaseValidator from "../../core/Validator"
export default class CommentValidator extends BaseValidator {
    constructor() {
        super()
    }
    commentTask(req, res, next){
        try {
            const checkContent = super.commentValidate(req, res)
            if (checkContent != true) return checkContent;
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString(),
            })
        }
    }
    
}