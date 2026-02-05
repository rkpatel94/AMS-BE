/**
 * User Service
 * Business logic for User operations
 */

const mongoose = require('mongoose');
const { User } = require('../models');
const ApiError = require('../utils/api-error.util');

/**
 * Get all users with formatted response
 * @returns {Promise<Array>} Array of users with fullName
 */
const getAllUsers = async () => {
    const users = await User.find().sort({ createdAt: -1 });

    return users.map(user => ({
        id: user._id,
        fullName: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        status: user.status,
        isActive: user.isActive,
        avatar: user.avatar,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }));
};

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User object
 */
const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    return user;
};

/**
 * Create or update a user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created/updated user and isNew flag
 */
const upsertUser = async (userData) => {
    const { id, _id, ...data } = userData;
    const userId = id || _id;

    // Clean up any stray id fields
    delete data._id;
    delete data.id;

    let user;
    let isNew = false;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
        user = await User.findByIdAndUpdate(userId, data, {
            new: true,
            runValidators: true
        });

        if (!user) {
            throw ApiError.notFound('User not found for update');
        }
    } else {
        user = new User(data);
        await user.save();
        isNew = true;
    }

    return { user, isNew };
};

/**
 * Delete a user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Deleted user ID
 */
const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    return { userId };
};

module.exports = {
    getAllUsers,
    getUserById,
    upsertUser,
    deleteUser
};
