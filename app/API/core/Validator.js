import validator from "validator"
export default class BaseValidator {
    emailValidate(req, res) {
        try {
            if (!validator.isEmail(req.body.Email)) {
                return res.status(200).json({
                    status: 400,
                    error: 'Email is invalid'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Email error',
                error: error.toString()
            })
        }
    }
    usernameValidate(req, res) {
        try {
            if (!validator.isLength(req.body.Username, {
                    min: 5,
                    max: 30
                })) {
                return res.status(200).json({
                    status: 400,
                    error: 'Username is invalid',
                    message: 'Username is too long or too short'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Username error',
                error: error.toString()
            })
        }
    }
    fullnameValidate(req, res) {
        try {
            if (!validator.isLength(req.body.FullName, {
                    min: 1,
                    max: 255
                })) {
                return res.status(200).json({
                    status: 400,
                    error: 'Fullname is invalid',
                    message: 'Fullname is too long or null'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Fullname error',
                error: error.toString()
            })
        }
    }
    passwordValidate(req, res) {
        try {

            if (!validator.isLength(req.body.Password, {
                    min: 6
                }) || !validator.isAlphanumeric(req.body.Password)) {
                return res.status(200).json({
                    status: 400,
                    error: 'Paswword is invalid',
                    message: 'Password is greater than 6 character and only number,alphabet'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Password error',
                error: error.toString()
            })
        }
    }
    phoneValidate(req, res) {
        try {
            if (req.body.PhoneNumber != undefined) {
                if (!validator.isMobilePhone(req.body.PhoneNumber, ['vi-VN', 'en-US'])) {
                    return res.status(200).json({
                        status: 400,
                        error: 'Phone number is invalid'
                    })
                }
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Phone number error',
                error: error.toString()
            })
        }
    }
    birthdayValidate(req, res) {
        try {
            if (req.body.BirthDday != undefined) {
                if (!validator.isDate(req.body.BirthDday)) {
                    return res.status(200).json({
                        status: 400,
                        error: 'Bitrhday is invalid'
                    })
                }
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Birthday error',
                error: error.toString()
            })
        }
    }
    addressValidate(req, res) {
        try {
            if (req.body.Address != undefined) {
                if (!validator.isLength(req.body.Address, {
                        min: 1,
                        max: 255
                    })) {

                    return res.status(200).json({
                        status: 400,
                        error: 'Address is invalid'
                    })

                }
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Address error',
                error: error.toString()
            })
        }
    }
    avatarValidate(req, res) {
        try {
            if (req.file == undefined) {
                // if (!validator.isURL(req.file)) {
                    return res.status(200).json({
                        status: 400,
                        error: 'Avatar is invalid'
                    })

                // }
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Avatar error',
                error: error.toString()
            })
        }
    }
}