/**
 * Master Service
 * Business logic for Master data operations (Department, Role, Designation)
 */

const mongoose = require('mongoose');
const { Department, RoleMaster, Designation } = require('../models');
const ApiError = require('../utils/api-error.util');

/**
 * Get model by type
 * @param {string} type - Master type
 * @returns {mongoose.Model} Mongoose model
 */
const getModelByType = (type) => {
    const models = {
        department: Department,
        role: RoleMaster,
        designation: Designation
    };

    return models[type.toLowerCase()] || null;
};

/**
 * Get all items of a master type
 * @param {string} type - Master type
 * @returns {Promise<Array>} Array of items
 */
const getAll = async (type) => {
    const Model = getModelByType(type);

    if (!Model) {
        throw ApiError.badRequest('Invalid master type');
    }

    return Model.find().sort({ name: 1 });
};

/**
 * Get item by ID
 * @param {string} type - Master type
 * @param {string} itemId - Item ID
 * @returns {Promise<Object>} Item object
 */
const getById = async (type, itemId) => {
    const Model = getModelByType(type);

    if (!Model) {
        throw ApiError.badRequest('Invalid master type');
    }

    const item = await Model.findById(itemId);

    if (!item) {
        throw ApiError.notFound(`${type} not found`);
    }

    return item;
};

/**
 * Create or update master item
 * @param {string} type - Master type
 * @param {Object} itemData - Item data
 * @returns {Promise<Object>} Created/updated item and isNew flag
 */
const upsert = async (type, itemData) => {
    const Model = getModelByType(type);

    if (!Model) {
        throw ApiError.badRequest('Invalid master type');
    }

    const { id, _id, ...data } = itemData;
    const itemId = id || _id;

    let item;
    let isNew = false;

    if (itemId && mongoose.Types.ObjectId.isValid(itemId)) {
        item = await Model.findByIdAndUpdate(itemId, data, {
            new: true,
            runValidators: true
        });

        if (!item) {
            throw ApiError.notFound(`${type} not found for update`);
        }
    } else {
        item = new Model(data);
        await item.save();
        isNew = true;
    }

    return { item, isNew };
};

/**
 * Delete master item
 * @param {string} type - Master type
 * @param {string} itemId - Item ID
 * @returns {Promise<Object>} Deleted item ID
 */
const deleteItem = async (type, itemId) => {
    const Model = getModelByType(type);

    if (!Model) {
        throw ApiError.badRequest('Invalid master type');
    }

    const item = await Model.findByIdAndDelete(itemId);

    if (!item) {
        throw ApiError.notFound(`${type} not found`);
    }

    return { id: itemId };
};

module.exports = {
    getAll,
    getById,
    upsert,
    deleteItem
};
