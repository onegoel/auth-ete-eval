const Joi = require('joi');

module.exports = {
    authSchema: Joi.object({
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .min(3)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    }),

    tokenSchema: Joi.object({
        token: Joi
            .string()
            .required()
    })
};
