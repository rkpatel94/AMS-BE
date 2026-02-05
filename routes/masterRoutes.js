const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

/**
 * @swagger
 * tags:
 *   name: Masters
 *   description: Management of Department, Role, and Designation masters
 */

/**
 * @swagger
 * /api/masters/{type}:
 *   get:
 *     summary: Returns the list of all items for a given master type
 *     tags: [Masters]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [department, role, designation]
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Master'
 */
router.get('/:type', masterController.getAll);

/**
 * @swagger
 * /api/masters/{type}/{id}:
 *   get:
 *     summary: Get an item by id
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
 *         description: Item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Master'
 */
router.get('/:type/:id', masterController.getById);

/**
 * @swagger
 * /api/masters/{type}/upsert:
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
 */
router.post('/:type/upsert', masterController.upsert);

/**
 * @swagger
 * /api/masters/{type}/{id}:
 *   delete:
 *     summary: Delete a master item
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
 */
router.delete('/:type/:id', masterController.delete);

module.exports = router;
