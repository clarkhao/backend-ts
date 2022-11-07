import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {routerGraphQL, errorHandler, routerApiDoc} from './middleware';
import {githubOauth} from './route';
dotenv.config();
const config = require('config');

const app: Express = express();
const port = process.env[config.get('server.port')];
/** 
 * @swagger 
 * /: 
 *   get: 
 *     description: init 
 *     responses:  
 *       200: 
 *         description: Success  
 */ 
app.get('/', async (req: Request, res: Response) => {
    res.json({env:process.env.NODE_ENV,host:config.get('server.host')})
});
app.use(routerGraphQL);
app.use(routerApiDoc);
app.use(githubOauth);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`
        NODE_ENV is ${process.env.NODE_ENV}
        ⚡️[server]: Server is running at ${config.get('server.host')}:${port}
    `);
});