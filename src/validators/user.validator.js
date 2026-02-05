/**
 * User Validator
 * Request validation for user-related endpoints
 */

const ApiError = require('../utils/api-error.util');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_ROLES = ['Admin', 'Operator', 'Supervisor', 'Viewer'];
const VALID_STATUSES = ['Active', 'Inactive', 'Suspended'];

/**
 * Validate user upsert request
 */
const validateUserUpsert = (req, res, next) => {
    const { firstName, lastName, email, role, status } = req.body;
    const errors = [];

    // Required fields
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
        errors.push('firstName is required');
    }

    if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0) {
        errors.push('lastName is required');
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
        errors.push('Valid email is required');
    }

    // Optional field validation
    if (role && !VALID_ROLES.includes(role)) {
        errors.push(`role must be one of: ${VALID_ROLES.join(', ')}`);
    }

    if (status && !VALID_STATUSES.includes(status)) {
        errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    if (errors.length > 0) {
        return next(ApiError.badRequest(errors.join('; ')));
    }

    next();
};

/**
 * Validate ID parameter
 */
const validateIdParam = (req, res, next) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || id.trim().length === 0) {
        return next(ApiError.badRequest('ID parameter is required'));
    }

    // Basic MongoDB ObjectId format check (24 hex characters)
    const objectIdRegex = /^[a-fA-F0-9]{24}$/;
    if (!objectIdRegex.test(id)) {
        return next(ApiError.badRequest('Invalid ID format'));
    }

    next();
};

module.exports = {
    validateUserUpsert,
    validateIdParam
};
