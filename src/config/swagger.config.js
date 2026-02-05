/**
 * Swagger Configuration
 * API documentation setup
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AMS Backend API',
            version: '1.0.0',
            description: 'Production-grade API for Attendance Management System (AMS)',
            contact: {
                name: 'API Support'
            }
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email'],
                    properties: {
                        id: { type: 'string', description: 'User ID' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        fullName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        personalEmail: { type: 'string', format: 'email' },
                        contactNumber: { type: 'string' },
                        dob: { type: 'string', format: 'date' },
                        doj: { type: 'string', format: 'date' },
                        department: { type: 'string' },
                        designation: { type: 'string' },
                        role: {
                            type: 'string',
                            enum: ['Admin', 'Operator', 'Supervisor', 'Viewer']
                        },
                        status: {
                            type: 'string',
                            enum: ['Active', 'Inactive', 'Suspended']
                        },
                        isActive: { type: 'boolean' },
                        profileImage: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                UserUpsert: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email'],
                    properties: {
                        id: { type: 'string', description: 'Optional ID for update' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        personalEmail: { type: 'string' },
                        contactNumber: { type: 'string' },
                        dob: { type: 'string', format: 'date' },
                        doj: { type: 'string', format: 'date' },
                        department: { type: 'string' },
                        designation: { type: 'string' },
                        role: { type: 'string', enum: ['Admin', 'Operator', 'Supervisor', 'Viewer'] },
                        status: { type: 'string', enum: ['Active', 'Inactive', 'Suspended'] },
                        isActive: { type: 'boolean' },
                        profileImage: { type: 'string' }
                    }
                },
                Master: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        isActive: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                MasterUpsert: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        id: { type: 'string', description: 'Optional ID for update' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        isActive: { type: 'boolean' }
                    }
                },
                ApiResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                        data: { type: 'object', nullable: true }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
