/**
 * Config Index - Barrel Export
 */

const connectDB = require('./db.config');
const swaggerSpec = require('./swagger.config');
const constants = require('./constants.config');

module.exports = {
    connectDB,
    swaggerSpec,
    constants
};
