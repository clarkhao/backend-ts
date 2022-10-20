import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const { Pool } = require("pg");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const credentials_local = {
    user: "postgres",
    host: process.env.DB_HOST,
    database: "postgres",
    password: process.env.DB_PWD,
    port: 5432,
};
  
  // Connect with a connection pool.
  
async function poolDemo() {
    const pool = new Pool(credentials_local);
    const now = await pool.query(`
        select 3 as num;
    `);
    await pool.end();
    return now;
}  

app.get('/', async (req: Request, res: Response) => {
    const poolResult = await poolDemo();
    res.send(JSON.stringify(poolResult.rows));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});