import { RequestHandler } from "express";
import {signUpRepeatInfoCheck,
        sendEmailWithToken,
        saveUnloggedInfo} from '../../service';

const signUpRepeatInfo: RequestHandler = async (req, res, next) => {
    const result = await signUpRepeatInfoCheck(res.locals.data)
        .then(check => {
            console.log(`check: ${check}`);
            return saveUnloggedInfo(res.locals.data);
        })
        .then(query => {
            console.log(`query: ${query}`);
            res.locals.id = query;
            return query;
        })
        .catch((err:Error) => {
            console.log(err);
            const status = parseInt(err.toString().split(' ')[0]);
            res.status(status).json({message: err});
        });
    if(result) {
        console.log('ready to send email');
        res.locals.id = result;
        next();
    }
}

const sendEmail: RequestHandler =async (req, res, next) => {
    const id = res.locals.id['id'];
    const pairs = JSON.parse(res.locals.data);
    const status = await sendEmailWithToken(pairs.email, id)
        .catch((err:Error) => {
            console.log(err);
            const status = parseInt(err.toString().split(' ')[0]);
            res.status(status).json({message: err});
        });
    if(status)
        res.status(200).json({message: 'OK'});
}

export {signUpRepeatInfo, sendEmail};