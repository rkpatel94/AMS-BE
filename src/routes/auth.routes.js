/**
 * Auth Routes
 * Routing only - NO logic
 */

const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { authValidator } = require('../validators');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/v1/auth/microsoft-login:
 *   post:
 *     summary: Login with Microsoft account
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
 *                 format: email
 *               name:
 *                 type: string
 *               microsoftId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       type: object
 *       400:
 *         description: Validation error
 *       403:
 *         description: User inactive
 */
router.post('/microsoft-login', authValidator.validateMicrosoftLogin, authController.microsoftLogin);

module.exports = router;
