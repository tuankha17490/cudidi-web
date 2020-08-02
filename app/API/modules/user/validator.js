import BaseValidator from "../../core/Validator"
export default class UserValidator extends BaseValidator {
    constructor() {
        super()
    }
    registerTask(req, res, next) {
        try {
            const checkEmail = super.emailValidate(req, res)
            if (checkEmail != true) return checkEmail;
            const checkUsername = super.usernameValidate(req, res)
            if (checkUsername != true) return checkUsername;
            const checkFullname = super.fullnameValidate(req, res)
            if (checkFullname != true) return checkFullname;
            const checkPassword = super.passwordValidate(req, res)
            if (checkPassword != true) return checkPassword;
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString()
            })
        }
    }
    updateTask(req, res, next) {
        try {
            const checkEmail = super.emailValidate(req, res)
            if (checkEmail != true) return checkEmail;
            const checkUsername = super.usernameValidate(req, res)
            if (checkUsername != true) return checkUsername;
            const checkFullname = super.fullnameValidate(req, res)
            if (checkFullname != true) return checkFullname;
            if (req.body.Password != undefined) {
                const checkPassword = super.passwordValidate(req, res)
                if (checkPassword != true) return checkPassword;
            }
            const checkPhone = super.phoneValidate(req, res)
            if (checkPhone != true) return checkPhone;
            const checkBirthday = super.birthdayValidate(req, res)
            if (checkBirthday != true) return checkBirthday;
            const checkAddress = super.addressValidate(req, res)
            if (checkAddress != true) return checkAddress;
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString(),
            })
        }
    }
    uploadImage(req, res, next) {
        try {
            const checkAvatar = super.avatarValidate(req, res)
            if (checkAvatar != true) return checkAvatar;
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString()
            })
        }
    }
    // login(req, res, next) {
    //     try {
    //         const checkUsername = super.usernameValidate(req, res)
    //         if (checkUsername != true) return checkUsername;
    //         next()
    //     } catch (error) {
    //         return res.status(200).json({
    //             status: 400,
    //             error: error.toString()
    //         })
    //     }
    // }
}