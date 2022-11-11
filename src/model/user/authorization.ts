import { Token,Role } from "../prismaModel";
import jwt from 'jsonwebtoken';
const config = require('config');
import {PGConnect, mailer, Mailer} from '../../utils';

class Authorization implements Token {
    id: number = 0;
    role: Role = Role.Unlogged;
    emailToken: string | null = null;
    userId: number;
    mailer?: Mailer;
    db: PGConnect;
    public constructor(id: number, db:PGConnect, mailer?: Mailer) {
        this.userId = id;
        this.mailer = mailer;
        this.db = db; 
    }
    //duration: i.e. '120s'
    public generateToken(duration: string) {
        return jwt.sign({id: this.userId}, 
            process.env[config.get('tokens.key')] || '', 
            { expiresIn: duration});
    }
    setRole(value:Role) {
        this.role = value;
    }
    public createToken() {
        return this.db.connect(`
            insert into auth.token ("role", "emailToken", "userId")
            values ($1,$2,$3)
        `,[this.role, this.emailToken, this.userId])
        .then(res => res as boolean);
    }
}

export {Authorization}