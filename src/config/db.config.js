/**
 * Database Configuration
 * MongoDB connection using environment variables
 */

const mongoose = require('mongoose');
const { logger } = require('../utils');

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        logger.error('MONGO_URI environment variable is not defined');
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(MONGO_URI);

        logger.info('MongoDB connected', {
            host: conn.connection.host,
            name: conn.connection.name
        });
    } catch (err) {
        logger.error('MongoDB connection failed', {
            message: err.message
        });
        process.exit(1);
    }
};

module.exports = connectDB;
