/**
 * Not Found Middleware
 * Handles 404 errors for undefined routes
 */

const ApiError = require('../utils/api-error.util');

const notFoundMiddleware = (req, res, next) => {
    next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};

module.exports = notFoundMiddleware;
