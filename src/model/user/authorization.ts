import { Token,Role } from "../prismaModel";
import jwt from 'jsonwebtoken';
const config = require('config');
import {PGConnect} from '../../utils';

enum TokenType {
    RESEND = 'tokens.resend_key',
    EMAIL = 'tokens.key',
    API = 'api_key'
}

class Authorization implements Token {
    id: number = 0;
    role: Role = Role.Unlogged;
    emailToken: string | null = null;
    userId: number;
    db: PGConnect;
    //userId is the id of table user
    public constructor(id: number, db:PGConnect) {
        this.userId = id;
        this.db = db; 
    }
    //duration: i.e. '120s'
    public generateToken(duration: string, tokenType: keyof typeof TokenType) {
        if(tokenType === 'RESEND' || tokenType === 'EMAIL') {
            return jwt.sign({id: this.userId}, 
                process.env[config.get(TokenType[tokenType])] || '', 
                { expiresIn: '120s'});
        } else {
            return jwt.sign({id: this.userId}, 
                process.env[config.get(TokenType[tokenType])] || '', 
                { expiresIn: duration, algorithm: 'RS256'});
        }
        
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

export {Authorization,TokenType}