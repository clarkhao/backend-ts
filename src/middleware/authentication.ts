import { RequestHandler } from "express";
import {Cryption} from '../utils';

const Authentication: RequestHandler = (req, res, next) => {
    const cryption = new Cryption(req.body.secret, req.body.sign, req.body.data);
    try {
        if(cryption.isSecret() && cryption.isSignValidated()) {
            console.log('signature passed');
            res.locals.data = cryption.decrypted;
            next();
        }
    } catch(err) {
        console.log(err);
        res.status(401).json({message: 'signature broken'});
    }
}

export {Authentication};