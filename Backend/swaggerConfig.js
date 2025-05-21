// swaggerConfig.js
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'URL Shortener API',
            version: '1.0.0',
            description: 'Backend API for shortening URLs, with authentication and analytics',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT Bearer token **_only_**'
                },
            },
            schemas: { 
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid', description: 'User ID' },
                        firstName: { type: 'string', description: 'User\'s first name' },
                        lastName: { type: 'string', description: 'User\'s last name' },
                        email: { type: 'string', format: 'email', description: 'User\'s email address' },
                        profileImageUrl: { type: 'string', format: 'url', nullable: true, description: 'URL of the user\'s profile image' },
                        createdAt: { type: 'string', format: 'date-time', description: 'Timestamp of user creation' },
                    },
                    required: ['id', 'firstName', 'lastName', 'email', 'createdAt']
                },
                URL: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: 'URL ID' },
                      short_url: { type: 'string', description: 'Short url' },
                      original_url: { type: 'string', description: 'The original URL' },
                      user_id: { type: 'string', format: 'uuid', description: 'ID of the user who owns the url' },
                      created_at: { type: 'string', format: 'date-time', description: 'Timestamp of URL creation' },
                      expires_at: { type: 'string', format: 'date-time', description: 'When the URL expires' },
                    },
                    required: ['id', 'user_id', 'original_url', 'short_url', 'created_at']
                  },               
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', description: 'Error message' },
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
