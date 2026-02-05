/**
 * Validation Middleware
 * Generic middleware to validate request data against a Joi schema
 */

const ApiError = require('../utils/api-error.util');

/**
 * Validate request data against a schema
 * @param {Object} schemas - Object containing Joi schemas for body, params, and query
 */
const validate = (schemas) => (req, res, next) => {
    const validations = ['body', 'params', 'query'].map((key) => {
        const schema = schemas[key];
        const value = req[key];

        if (!schema) return null;

        const { error, value: validatedValue } = schema.validate(value, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message.replace(/"/g, ''))
                .join(', ');
            return errorMessage;
        }

        // Replace original request data with validated/sanitized data
        req[key] = validatedValue;
        return null;
    });

    const errors = validations.filter(Boolean);

    if (errors.length > 0) {
        return next(ApiError.badRequest(errors.join('; ')));
    }

    next();
};

module.exports = validate;
