/**
 * Auth Service
 * Business logic for Authentication operations
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../utils/api-error.util');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Handle Microsoft login
 * @param {Object} loginData - Login data { email, name, microsoftId }
 * @returns {Promise<Object>} Token and user data
 */
const microsoftLogin = async (loginData) => {
    const { email, name } = loginData;

    // Find existing user
    let user = await User.findOne({ email: email.toLowerCase() });

    // Create user if not exists (auto-provisioning for demo)
    if (!user) {
        const nameParts = (name || email.split('@')[0]).split(' ');
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.slice(1).join(' ') || '';

        user = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            role: 'Operator',
            status: 'Active',
            isActive: true
        });

        await user.save();
    }

    // Check if user is active
    if (user.status !== 'Active') {
        throw ApiError.forbidden('User account is inactive or suspended');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    microsoftLogin
};
