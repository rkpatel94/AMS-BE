/**
 * Request Logger Middleware
 * Logs all incoming requests using structured logger
 */

const { logger } = require('../utils');

const requestLoggerMiddleware = (req, res, next) => {
    const startTime = Date.now();

    // Log on response finish
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger.info('Request processed', {
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`
        });
    });

    next();
};

module.exports = requestLoggerMiddleware;
