import { RequestHandler } from "express";
import {getCodeFromGithub,
        getTokenFromGithub,
        getUserInfoWithToken,
        saveInfoInPG} from '../../service';

const githubOauthCallback: RequestHandler = async (req, res, next) => {
    const result = await getCodeFromGithub(req.query as Record<string,string>)
    .then( (code) => {
        console.log(`code: ${code}`);
        return getTokenFromGithub(code);
    }).then(token => {
        console.log(`token: ${token}`);
        return getUserInfoWithToken(token);
    }).then(info => {
        console.log(`info: ${info}`);
        return saveInfoInPG(info);
    }).then(query => {
        console.log(`query: ${query}`);
        return query;
    })
    .catch((err:Error) => {
        console.log(`error: ${err}`);
        next(err);
        return err;
    })
    if(typeof result === 'string') {
        res.status(200).json({code:200,message:'OK'});
    } else if(result instanceof Error) {
        res.status(400).json({message: 'failed to login'});
    }
}

export {githubOauthCallback};