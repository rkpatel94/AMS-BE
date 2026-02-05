/**
 * Application Constants
 * Centralized configuration values
 */

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
};

const USER_ROLES = Object.freeze({
    ADMIN: 'Admin',
    OPERATOR: 'Operator',
    SUPERVISOR: 'Supervisor',
    VIEWER: 'Viewer'
});

const USER_STATUSES = Object.freeze({
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    SUSPENDED: 'Suspended'
});

const MASTER_TYPES = Object.freeze({
    DEPARTMENT: 'department',
    ROLE: 'role',
    DESIGNATION: 'designation'
});

const PAGINATION = Object.freeze({
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
});

module.exports = {
    HTTP_STATUS,
    USER_ROLES,
    USER_STATUSES,
    MASTER_TYPES,
    PAGINATION
};
