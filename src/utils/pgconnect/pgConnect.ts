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
            user: process.env[config.get('db.db_graph.user')] || '',
            host: process.env[config.get('db.host')] || '',
            database: db,
            password: process.env[config.get('db.db_graph.pwd')] || '',
            port: config.get('db.port')
        }
        this.pool = new Pool(this.credentials);
    }
    public connect(text: string, values?: unknown[]) {
        return this.pool.connect().then(client => {
            return client.query(text, values).then(res => {
                client.release();
                if(res.command === 'insert' || 'update') {
                    if(res.rowCount > 0)
                        return true;
                    else 
                        return false;
                } else {
                    return res.rows as string[];
                }            
            }).catch(err => {
                client.release();
                throw new Error(err.stack);
            })
        })
    }
}
const db = new PGConnect(process.env[config.get('db.db_graph.name')] || '');
export {db};