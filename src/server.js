/**
 * Server Entry Point
 * Handles server startup and graceful shutdown
 */

require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config');
const { logger } = require('./utils');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Validate required environment variables
 */
const validateEnv = () => {
    const required = ['MONGO_URI', 'JWT_SECRET'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        logger.error('Missing required environment variables', { missing });
        process.exit(1);
    }
};

/**
 * Start the server
 */
const startServer = async () => {
    try {
        // Validate environment
        validateEnv();

        // Connect to database
        await connectDB();

        // Start listening
        const server = app.listen(PORT, () => {
            logger.info('Server started', {
                port: PORT,
                environment: NODE_ENV,
                url: `http://localhost:${PORT}`,
                docs: `http://localhost:${PORT}/api-docs`
            });
        });

        // Graceful shutdown handlers
        const gracefulShutdown = (signal) => {
            logger.info(`${signal} received, shutting down gracefully`);
            server.close(() => {
                logger.info('Server closed');
                process.exit(0);
            });

            // Force close after 10 seconds
            setTimeout(() => {
                logger.error('Forced shutdown after timeout');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
            logger.error('Unhandled Promise Rejection', {
                reason: reason?.message || reason,
                stack: reason?.stack
            });
        });

        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            logger.error('Uncaught Exception', {
                message: error.message,
                stack: error.stack
            });
            process.exit(1);
        });

    } catch (error) {
        logger.error('Failed to start server', {
            message: error.message,
            stack: error.stack
        });
        process.exit(1);
    }
};

// Start the server
startServer();
