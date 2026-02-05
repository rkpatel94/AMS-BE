/**
 * Global Error Handler Middleware
 * All errors pass through this middleware for standardized handling
 */

const { logger, sendError } = require('../utils');
const ApiError = require('../utils/api-error.util');

const errorMiddleware = (err, req, res, next) => {
    // Log the error internally (never expose to client)
    logger.error('Error occurred', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method
    });

    // Handle known API errors
    if (err instanceof ApiError) {
        return sendError(res, {
            statusCode: err.statusCode,
            message: err.message
        });
    }

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return sendError(res, {
            statusCode: 400,
            message: messages.join(', ')
        });
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return sendError(res, {
            statusCode: 409,
            message: `${field} already exists`
        });
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        return sendError(res, {
            statusCode: 400,
            message: 'Invalid ID format'
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return sendError(res, {
            statusCode: 401,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return sendError(res, {
            statusCode: 401,
            message: 'Token expired'
        });
    }

    // Default: Internal Server Error (never expose internal details)
    return sendError(res, {
        statusCode: 500,
        message: 'An unexpected error occurred'
    });
};

module.exports = errorMiddleware;
