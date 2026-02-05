/**
 * Validators Index - Barrel Export
 */

const userValidator = require('./user.validator');
const authValidator = require('./auth.validator');
const masterValidator = require('./master.validator');

module.exports = {
    userValidator,
    authValidator,
    masterValidator
};
