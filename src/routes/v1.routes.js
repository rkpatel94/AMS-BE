/**
 * API v1 Router
 * Aggregates all v1 routes
 */

const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const masterRoutes = require('./master.routes');

// Mount routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/masters', masterRoutes);

module.exports = router;
