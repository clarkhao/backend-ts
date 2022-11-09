import express, { Express, Request, Response } from 'express';
import {routerGraphQL, routerApiDoc} from './api';
import {errorHandler} from './middleware';
import {githubOauth} from './route';
require('dotenv').config();
const config = require('config');

const app: Express = express();
const port = process.env[config.get('server.port')];
import {readAllGithubUser} from './service';
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
    const result = await readAllGithubUser();
    res.json(result);
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