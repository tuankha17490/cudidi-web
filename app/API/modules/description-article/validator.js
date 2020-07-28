import BaseValidator from "../../core/Validator"
export default class DescriptionArticleValidator extends BaseValidator {
    constructor() {
        super()
    }
    createTask(req, res, next){
        try {
            const checkDay = super.durationValidate(req.body.Day, res)
            if (checkDay != true) return checkDay;
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString(),
            })
        }
    }
}