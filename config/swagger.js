const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AMS Backend API',
            version: '1.0.0',
            description: 'API documentation for the Abnormality Management System (AMS)',
            contact: {
                name: 'Developer',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The auto-generated id of the user',
                        },
                        firstName: {
                            type: 'string',
                            description: 'The first name of the user',
                        },
                        lastName: {
                            type: 'string',
                            description: 'The last name of the user',
                        },
                        name: {
                            type: 'string',
                            description: 'The full name of the user',
                        },
                        email: {
                            type: 'string',
                            description: 'The work email of the user',
                        },
                        personalEmail: {
                            type: 'string',
                        },
                        contactNumber: {
                            type: 'string',
                        },
                        dob: {
                            type: 'string',
                            format: 'date',
                        },
                        doj: {
                            type: 'string',
                            format: 'date',
                        },
                        designation: {
                            type: 'string',
                        },
                        department: {
                            type: 'string',
                            description: 'The department of the user',
                        },
                        role: {
                            type: 'string',
                            enum: ['Admin', 'Operator', 'Supervisor', 'Viewer'],
                            description: 'The role of the user',
                        },
                        status: {
                            type: 'string',
                            enum: ['Active', 'Inactive', 'Suspended'],
                            description: 'The status of the user',
                        },
                        isActive: {
                            type: 'boolean',
                        },
                        profileImage: {
                            type: 'string',
                            description: 'URL or base64 of user profile image',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date the user was created',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date the user was last updated',
                        },
                    },
                },
                UserUpsert: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Optional ID for update. Omit for creation.',
                        },
                        firstName: {
                            type: 'string',
                        },
                        lastName: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        },
                        personalEmail: {
                            type: 'string',
                        },
                        contactNumber: {
                            type: 'string',
                        },
                        dob: {
                            type: 'string',
                            format: 'date',
                        },
                        doj: {
                            type: 'string',
                            format: 'date',
                        },
                        designation: {
                            type: 'string',
                        },
                        department: {
                            type: 'string',
                        },
                        role: {
                            type: 'string',
                            enum: ['Admin', 'Operator', 'Supervisor', 'Viewer'],
                        },
                        status: {
                            type: 'string',
                            enum: ['Active', 'Inactive', 'Suspended'],
                        },
                        isActive: {
                            type: 'boolean',
                        },
                        profileImage: {
                            type: 'string',
                        },
                    },
                },
                Master: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        _id: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        isActive: {
                            type: 'boolean',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                MasterUpsert: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Optional ID for update. Omit for creation.',
                        },
                        name: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        isActive: {
                            type: 'boolean',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
