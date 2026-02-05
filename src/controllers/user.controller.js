/**
 * User Controller
 * Request/Response handling only - NO business logic
 */

const { userService } = require('../services');
const { asyncHandler, sendSuccess } = require('../utils');

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Public
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

    sendSuccess(res, {
        message: 'Users retrieved successfully',
        data: users
    });
});

/**
 * @desc    Get user by ID
 * @route   GET /api/v1/users/:id
 * @access  Public
 */
const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    sendSuccess(res, {
        message: 'User retrieved successfully',
        data: user
    });
});

/**
 * @desc    Create or update user
 * @route   POST /api/v1/users/upsert
 * @access  Public
 */
const upsertUser = asyncHandler(async (req, res) => {
    // Pass both body and file to the service
    const { user, isNew } = await userService.upsertUser(req.body, req.file);

    sendSuccess(res, {
        statusCode: isNew ? 201 : 200,
        message: isNew ? 'User created successfully' : 'User updated successfully',
        data: user
    });
});

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/users/:id
 * @access  Public
 */
const deleteUser = asyncHandler(async (req, res) => {
    const result = await userService.deleteUser(req.params.id);

    sendSuccess(res, {
        message: 'User deleted successfully',
        data: result
    });
});

module.exports = {
    getAllUsers,
    getUserById,
    upsertUser,
    deleteUser
};
