/**
 * Auth Validator
 * Request validation for authentication endpoints
 */

const ApiError = require('../utils/api-error.util');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate Microsoft login request
 */
const validateMicrosoftLogin = (req, res, next) => {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
        return next(ApiError.badRequest('Valid email is required'));
    }

    next();
};

module.exports = {
    validateMicrosoftLogin
};
