/**
 * Models Index - Barrel Export
 */

const User = require('./user.model');
const Department = require('./department.model');
const RoleMaster = require('./role-master.model');
const Designation = require('./designation.model');

module.exports = {
    User,
    Department,
    RoleMaster,
    Designation
};
