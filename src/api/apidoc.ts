import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const config = require('config');

const routerApiDoc = express.Router();

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'API Test',
            version: '1.0.0',
        },
        servers: [
            {
              url: config.get('server.host').concat(":").concat(process.env[config.get('server.port')]),
              description: 'Development server',
            },
        ],
    },
    apis: [`./src/route/*/*.ts`, `./src/*.ts`],
};

const openapiSpecification = swaggerJsdoc(options);
routerApiDoc.use('/api', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export {routerApiDoc};