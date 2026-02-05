/**
 * Auth Controller
 * Request/Response handling only - NO business logic
 */

const { authService } = require('../services');
const { asyncHandler, sendSuccess } = require('../utils');

/**
 * @desc    Microsoft login
 * @route   POST /api/v1/auth/microsoft-login
 * @access  Public
 */
const microsoftLogin = asyncHandler(async (req, res) => {
    const result = await authService.microsoftLogin(req.body);

    sendSuccess(res, {
        message: 'Login successful',
        data: result
    });
});

module.exports = {
    microsoftLogin
};
