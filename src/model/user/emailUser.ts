import {EmailUser} from '../prismaModel';
import { MainUser } from './user';
import {ID} from './oauthUser';
const config = require('config');
import {PGConnect} from '../../utils';
const crypto = require('crypto');

type Email = EmailUser & {name: string};

class CustomUser extends MainUser<ID> implements EmailUser {
    email: string;
    salt: string;
    hash: string;
    createAt: Date = new Date();
    lastUpdateAt: Date = new Date();
    public constructor(db:PGConnect, name:string, hash: string,email?:string, ) {
        super(db, name);
        this.email = email || '';
        this.salt = crypto.randomBytes(16).toString('hex');; 
        this.hash = crypto.pbkdf2Sync(hash, this.salt, 1000, 64, `sha512`).toString(`hex`);
    }
    public createUser() {
        return this.db.connect(`
            with new_user as (
                insert into auth.email_user ("email", "salt", "hash")
                values ($1,$2,$3)
                returning *
            )
            insert into auth.user ("name", "githubUserId", "email")
            select $4, $5, "email" from new_user
            returning id;
        `, [this.email, this.salt, this.hash, this.name, this.githubUserId], false)
        .then(res => res as ID[]);
    }
    public readUser(name: string, email: string) {
        return this.db.connect<Email>(`
            select * 
            from auth.user as u, auth.email_user as e
            where name=$1 or email=$2;
        `, [name, email]).then(res => res as Email[])
        .then(row => row?.length > 0);
    }
}

export {CustomUser};