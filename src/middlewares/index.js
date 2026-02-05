/**
 * Middlewares Index - Barrel Export
 */

const errorMiddleware = require('./error.middleware');
const requestLoggerMiddleware = require('./request-logger.middleware');
const notFoundMiddleware = require('./not-found.middleware');
const upload = require('./upload.middleware');
const validate = require('./validate.middleware');

module.exports = {
    errorMiddleware,
    requestLoggerMiddleware,
    notFoundMiddleware,
    upload,
    validate
};
