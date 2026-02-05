/**
 * Master Validator
 * Request validation for master data endpoints
 */

const ApiError = require('../utils/api-error.util');

const VALID_TYPES = ['department', 'role', 'designation'];

/**
 * Validate master type parameter
 */
const validateMasterType = (req, res, next) => {
    const { type } = req.params;

    if (!type || !VALID_TYPES.includes(type.toLowerCase())) {
        return next(ApiError.badRequest(`type must be one of: ${VALID_TYPES.join(', ')}`));
    }

    next();
};

/**
 * Validate master upsert request
 */
const validateMasterUpsert = (req, res, next) => {
    const { name } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('name is required');
    }

    if (name && name.trim().length > 100) {
        errors.push('name must not exceed 100 characters');
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

    const objectIdRegex = /^[a-fA-F0-9]{24}$/;
    if (!objectIdRegex.test(id)) {
        return next(ApiError.badRequest('Invalid ID format'));
    }

    next();
};

module.exports = {
    validateMasterType,
    validateMasterUpsert,
    validateIdParam
};
