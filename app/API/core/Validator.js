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
                    error: 'Password is invalid',
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
                return res.status(200).json({
                    status: 400,
                    error: 'Avatar is invalid'
                })
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
    imageValidate(image, res) {
        try {
            if (image == undefined) {
                return res.status(200).json({
                    status: 400,
                    error: 'Image cannot undefined'
                })
            }
            if (!validator.isURL(image)) {
                return res.status(200).json({
                    status: 400,
                    error: 'Image is invalid'
                })
            }
            return true
        } catch (error) {
             return res.status(200).json({
                status: 400,
                message: 'Image error',
                error: error.toString()
            })
        }
    }
    priceValidate(req, res) {
        try {
            if (req.body.Price == undefined) {
                return res.status(200).json({
                    status: 400,
                    error: 'Price can not empty'
                })
            }
            if(!(Number(req.body.Price) === req.body.Price)) {
                if(!validator.isNumeric(req.body.Price)) {
                    return res.status(200).json({
                        status: 400,
                        error: 'Price must be numberic'
                    })
                }
                req.body.Price = Number(req.body.Price)
            }
            if(req.body.Price <= 0) {
                return res.status(200).json({
                    status: 400,
                    error: 'Price must be greater than 0'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Price error',
                error: error.toString()
            })
        }
    }

    amountPeopleValidate(req, res) {
        try {
            if (req.body.NumberOfPeople == undefined) {
                return res.status(200).json({
                    status: 400,
                    error: 'Amount people can not empty'
                })
            }
            if(!(Number(req.body.NumberOfPeople) === req.body.NumberOfPeople)) {
                if(!validator.isNumeric(req.body.NumberOfPeople)) {
                    return res.status(200).json({
                        status: 400,
                        error: 'Price must be numberic'
                    })
                }
                req.body.NumberOfPeople = Number(req.body.NumberOfPeople)
            }
            if(Number.isInteger(req.body.NumberOfPeople) == false) {
                return res.status(200).json({
                    status: 400,
                    message: 'Amount people must be numberic'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Amount people error',
                error: error.toString()
            })
        }
    }
    locationValidate(req, res) {
        try {
            if (req.body.Location == undefined || validator.isEmpty(req.body.Location) == true) {
                return res.status(200).json({
                    status: 400,
                    error: 'Location can not empty'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Main Location error',
                error: error.toString()
            })
        }
    }
    titleValidate(req, res) {
        try {
            if (req.body.Title == undefined || validator.isEmpty(req.body.Title) == true) {
                return res.status(200).json({
                    status: 400,
                    error: 'Title can not empty'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Title error',
                error: error.toString()
            })
        }
    }
}