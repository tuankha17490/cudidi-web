import BaseValidator from "../../core/Validator"
export default class ArticleValidator extends BaseValidator {
    constructor() {
        super()
    }
    createTask(req, res, next){
        try {
            const checkPrice = super.priceValidate(req, res)
            if (checkPrice != true) return checkPrice;
            const checkDuration = super.durationValidate(req.body.Duration, res)
            if (checkDuration != true) return checkDuration;
            const checkTitle = super.titleValidate(req, res)
            if (checkTitle != true) return checkTitle;
            const checkAmountPeople = super.amountPeopleValidate(req, res)
            if (checkAmountPeople != true) return checkAmountPeople;
            const checkLocation = super.locationValidate(req.body.Location, res)
            if (checkLocation != true) return checkLocation;
            const checkImage = super.imageValidate(req.body.Image, res)
            if(checkImage != true) return checkImage;
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString(),
            })
        }
    }
    updateTask(req, res, next) {
        try {
            const checkPrice = super.priceValidate(req, res)
            if (checkPrice != true) return checkPrice;
            const checkDuration = super.durationValidate(req.body.Duration, res)
            if (checkDuration != true) return checkDuration;
            const checkTitle = super.titleValidate(req, res)
            if (checkTitle != true) return checkTitle;
            const checkAmountPeople = super.amountPeopleValidate(req, res)
            if (checkAmountPeople != true) return checkAmountPeople;
            const checkLocation = super.locationValidate(req.body.Location, res)
            if (checkLocation != true) return checkLocation;
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString(),
            })
        }
    }
}