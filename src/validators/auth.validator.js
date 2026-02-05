/**
 * Auth Validator
 * Request validation schemas for authentication endpoints
 */

const Joi = require('joi');
const validate = require('../middlewares/validate.middleware');

/**
 * Validation schema for Microsoft login request
 */
const microsoftLoginSchema = {
    body: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Valid email is required',
            'any.required': 'Email is required'
        }),
        name: Joi.string().optional(),
        microsoftId: Joi.string().optional()
    })
};

module.exports = {
    validateMicrosoftLogin: validate(microsoftLoginSchema)
};
