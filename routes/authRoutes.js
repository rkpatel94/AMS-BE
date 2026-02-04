const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /api/auth/microsoft-login:
 *   post:
 *     summary: Login with Microsoft account data provided by frontend
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               microsoftId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT and user data
 *       400:
 *         description: Email is required
 *       403:
 *         description: User account is inactive
 */
router.post('/microsoft-login', authController.microsoftLogin);

module.exports = router;
