/**
 * Master Controller
 * Request/Response handling only - NO business logic
 */

const { masterService } = require('../services');
const { asyncHandler, sendSuccess } = require('../utils');

/**
 * @desc    Get all master items by type
 * @route   GET /api/v1/masters/:type
 * @access  Public
 */
const getAll = asyncHandler(async (req, res) => {
    const items = await masterService.getAll(req.params.type);

    sendSuccess(res, {
        message: `${req.params.type} list retrieved successfully`,
        data: items
    });
});

/**
 * @desc    Get master item by ID
 * @route   GET /api/v1/masters/:type/:id
 * @access  Public
 */
const getById = asyncHandler(async (req, res) => {
    const item = await masterService.getById(req.params.type, req.params.id);

    sendSuccess(res, {
        message: `${req.params.type} retrieved successfully`,
        data: item
    });
});

/**
 * @desc    Create or update master item
 * @route   POST /api/v1/masters/:type/upsert
 * @access  Public
 */
const upsert = asyncHandler(async (req, res) => {
    const { item, isNew } = await masterService.upsert(req.params.type, req.body);

    sendSuccess(res, {
        statusCode: isNew ? 201 : 200,
        message: isNew ? `${req.params.type} created successfully` : `${req.params.type} updated successfully`,
        data: item
    });
});

/**
 * @desc    Delete master item
 * @route   DELETE /api/v1/masters/:type/:id
 * @access  Public
 */
const deleteItem = asyncHandler(async (req, res) => {
    const result = await masterService.deleteItem(req.params.type, req.params.id);

    sendSuccess(res, {
        message: `${req.params.type} deleted successfully`,
        data: result
    });
});

module.exports = {
    getAll,
    getById,
    upsert,
    deleteItem
};
