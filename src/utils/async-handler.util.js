/**
 * Async Handler Utility
 * Wraps async functions to catch errors and pass to global error handler
 * Eliminates inline try/catch in controllers
 */

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = asyncHandler;
