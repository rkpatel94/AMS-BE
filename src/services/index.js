/**
 * Services Index - Barrel Export
 */

const userService = require('./user.service');
const authService = require('./auth.service');
const masterService = require('./master.service');

module.exports = {
    userService,
    authService,
    masterService
};
