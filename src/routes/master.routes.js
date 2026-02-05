/**
 * Master Routes
 * Routing only - NO logic
 */

const express = require('express');
const router = express.Router();
const { masterController } = require('../controllers');
const { masterValidator } = require('../validators');

/**
 * @swagger
 * tags:
 *   name: Masters
 *   description: Master data management API (Department, Role, Designation)
 */

/**
 * @swagger
 * /api/v1/masters/{type}:
 *   get:
 *     summary: Get all items by master type
 *     tags: [Masters]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [department, role, designation]
 *         description: Master type
 *     responses:
 *       200:
 *         description: List retrieved successfully
 *       400:
 *         description: Invalid master type
 */
router.get('/:type', masterValidator.validateMasterType, masterController.getAll);

/**
 * @swagger
 * /api/v1/masters/{type}/upsert:
 *   post:
 *     summary: Create or update a master item
 *     tags: [Masters]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [department, role, designation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MasterUpsert'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Validation error
 */
router.post(
    '/:type/upsert',
    masterValidator.validateMasterType,
    masterValidator.validateMasterUpsert,
    masterController.upsert
);

/**
 * @swagger
 * /api/v1/masters/{type}/{id}:
 *   get:
 *     summary: Get master item by ID
 *     tags: [Masters]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [department, role, designation]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *       404:
 *         description: Item not found
 */
router.get(
    '/:type/:id',
    masterValidator.validateMasterType,
    masterValidator.validateIdParam,
    masterController.getById
);

/**
 * @swagger
 * /api/v1/masters/{type}/{id}:
 *   delete:
 *     summary: Delete master item by ID
 *     tags: [Masters]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [department, role, designation]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Item not found
 */
router.delete(
    '/:type/:id',
    masterValidator.validateMasterType,
    masterValidator.validateIdParam,
    masterController.deleteItem
);

module.exports = router;
