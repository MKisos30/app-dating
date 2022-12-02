const Joi = require('joi')

exports.regValid = Joi.object({
    fullName: Joi.string().min(4).max(20).required().messages({
        'string.empty': "FullName can not be empty",
        'string.min': "FullName must be at least 4 sybmols",
        'string.max': "FullName must be maximum 20 sybmols",
    }),
    email: Joi.string().email().massages({
        'string.email': "Incorecct email",
        'string.empty': "E-mail can not be empty",
    }),
    password: Joi.string().min(6).max(10).pattern(new RegExp('^[a-zA-Z0-9]{6,10}$')).massages({
        'string.pattern.base': "Password must includ only letters and numbers",
        'string.min': "Password must be at least 6 sybmols",
        'string.max': "Password must be maximum 10 sybmols",
    }),
    repeat_password: Joi.string().valid(Joi.ref('password')).messages({
        'any.only':"Passwords not same",
    })
})

exports.logInValid = Joi.object({
    email: Joi.string().email().massages({
        'string.email': "Incorecct email",
        'string.empty': "E-mail can not be empty",
    }),
    password: Joi.string().min(6).max(10).pattern(new RegExp('^[a-zA-Z0-9]{6,10}$')).massages({
        'string.pattern.base': "Password must includ only letters and numbers",
        'string.min': "Password must be at least 6 sybmols",
        'string.max': "Password must be maximum 10 sybmols",
    })
})
// firstEnter, city, lookingFor, dateOfBirth, hobbies, about, profilePicture, massages, likes, views