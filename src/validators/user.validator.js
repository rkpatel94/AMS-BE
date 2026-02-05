/**
 * User Validator
 * Request validation schemas for user-related endpoints
 */

const Joi = require('joi');
const validate = require('../middlewares/validate.middleware');
const { USER_ROLES, USER_STATUSES } = require('../config/constants.config');

/**
 * Validation schema for user upsert request
 */
const userUpsertSchema = {
    body: Joi.object({
        firstName: Joi.string().required().max(50).trim(),
        lastName: Joi.string().required().max(50).trim(),
        email: Joi.string().email().required().lowercase().trim(),
        personalEmail: Joi.string().email().allow(null, '').lowercase().trim(),
        contactNumber: Joi.string().allow(null, '').trim(),
        dob: Joi.date().allow(null),
        doj: Joi.date().allow(null),
        department: Joi.string().allow(null, '').trim(),
        designation: Joi.string().allow(null, '').trim(),
        role: Joi.string().valid(...Object.values(USER_ROLES)).default(USER_ROLES.OPERATOR),
        status: Joi.string().valid(...Object.values(USER_STATUSES)).default(USER_STATUSES.ACTIVE),
        isActive: Joi.boolean()
    })
};

/**
 * Validation schema for ID parameter
 */
const idParamSchema = {
    params: Joi.object({
        id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required().messages({
            'string.pattern.base': 'Invalid ID format'
        })
    })
};

module.exports = {
    validateUserUpsert: validate(userUpsertSchema),
    validateIdParam: validate(idParamSchema)
};
