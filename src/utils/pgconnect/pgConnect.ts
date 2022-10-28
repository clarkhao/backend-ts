import { Pool } from "pg";
const config = require('config');

type Credentials = {
    user: string,
    host: string,
    database: string,
    password: string,
    port: number
}

class PGConnect {
    private credentials: Credentials;
    private pool: Pool
    public constructor(db: string) {
        this.credentials = {
            user: config.get('db.user'),
            host: process.env[config.get('db.host')] || '',
            database: db,
            password: process.env[config.get('db.password')] || '',
            port: config.get('db.port')
        }
        this.pool = new Pool(this.credentials);
    }
    public dbConnect(query: string) {
        return this.pool.connect().then(client => {
            return client.query(query).then(res => {
                client.release();
                return res.rows as string[];
            }).catch(err => {
                client.release();
                throw new Error(err.stack);
            })
        })
    }
}

export {PGConnect};