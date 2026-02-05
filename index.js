const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const masterRoutes = require('./routes/masterRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'AMS Backend API Service',
        version: '1.0.0'
    });
});

// Mounting Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/masters', masterRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));



// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`
  🚀 Service is running!
  📡 URL: http://localhost:${PORT}
  🛠️ Environment: ${process.env.NODE_ENV || 'development'}
  `);
});
