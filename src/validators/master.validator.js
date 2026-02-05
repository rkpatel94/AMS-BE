/**
 * Master Validator
 * Request validation schemas for master data endpoints
 */

const Joi = require('joi');
const validate = require('../middlewares/validate.middleware');
const { MASTER_TYPES } = require('../config/constants.config');

/**
 * Validation schema for master type parameter
 */
const masterTypeSchema = {
    params: Joi.object({
        type: Joi.string().valid(...Object.values(MASTER_TYPES)).required().lowercase()
    })
};

/**
 * Validation schema for master upsert request
 */
const masterUpsertSchema = {
    body: Joi.object({
        id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).allow(null, '').messages({
            'string.pattern.base': 'Invalid ID format'
        }),
        name: Joi.string().required().max(100).trim(),
        description: Joi.string().allow(null, '').max(500).trim(),
        status: Joi.string().valid('Active', 'Inactive').default('Active')
    })
};

/**
 * Validation schema for ID parameter
 */
const idParamSchema = {
    params: Joi.object({
        type: Joi.string().valid(...Object.values(MASTER_TYPES)).required().lowercase(),
        id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required().messages({
            'string.pattern.base': 'Invalid ID format'
        })
    })
};

module.exports = {
    validateMasterType: validate(masterTypeSchema),
    validateMasterUpsert: validate(masterUpsertSchema),
    validateIdParam: validate(idParamSchema)
};
