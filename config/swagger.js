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
                    required: ['name', 'email'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The auto-generated id of the user',
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the user',
                        },
                        email: {
                            type: 'string',
                            description: 'The email of the user',
                        },
                        role: {
                            type: 'string',
                            enum: ['Admin', 'Operator', 'Supervisor', 'Viewer'],
                            description: 'The role of the user',
                        },
                        department: {
                            type: 'string',
                            description: 'The department of the user',
                        },
                        status: {
                            type: 'string',
                            enum: ['Active', 'Inactive', 'Suspended'],
                            description: 'The status of the user',
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
                    required: ['name', 'email'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Optional ID for update. Omit for creation.',
                        },
                        name: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        },
                        role: {
                            type: 'string',
                            enum: ['Admin', 'Operator', 'Supervisor', 'Viewer'],
                        },
                        department: {
                            type: 'string',
                        },
                        status: {
                            type: 'string',
                            enum: ['Active', 'Inactive', 'Suspended'],
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
