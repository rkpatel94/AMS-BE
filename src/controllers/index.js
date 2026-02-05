/**
 * Controllers Index - Barrel Export
 */

const userController = require('./user.controller');
const authController = require('./auth.controller');
const masterController = require('./master.controller');

module.exports = {
    userController,
    authController,
    masterController
};
