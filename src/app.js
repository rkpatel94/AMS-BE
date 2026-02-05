/**
 * Express Application Setup
 * Configures middleware, routes, and error handling
 * Separated from server.js for testability
 */

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const { v1Routes } = require('./routes');
const { swaggerSpec } = require('./config');
const {
    errorMiddleware,
    requestLoggerMiddleware,
    notFoundMiddleware
} = require('./middlewares');
const { sendSuccess } = require('./utils');

const app = express();

// ============================================
// MIDDLEWARE SETUP
// ============================================

// CORS configuration
app.use(cors());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging (uses structured logger)
app.use(requestLoggerMiddleware);

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/', (req, res) => {
    sendSuccess(res, {
        message: 'AMS Backend API Service',
        data: {
            status: 'online',
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development'
        }
    });
});

// API v1 routes (versioned)
app.use('/api/v1', v1Routes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler for undefined routes
app.use(notFoundMiddleware);

// Global error handler (must be last)
app.use(errorMiddleware);

module.exports = app;
