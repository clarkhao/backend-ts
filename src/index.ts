import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {routerGraphQL, errorHandler} from './middleware';
import {githubOauth} from './route';
dotenv.config();
const config = require('config');

const app: Express = express();
console.log(config.get('server.port'))
const port = process.env[config.get('server.port')];

app.use(routerGraphQL);
app.use(githubOauth);

app.get('/', async (req: Request, res: Response) => {
    res.send('Hello');
});
app.use(errorHandler);

app.listen(port, () => {
    console.log(`
        NODE_ENV is ${process.env.NODE_ENV}
        ⚡️[server]: Server is running at ${config.get('server.host')}:${port}
    `);
});