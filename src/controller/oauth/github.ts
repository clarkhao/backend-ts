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
        return saveInfoInPG(info);
    }).then(query => {
        console.log(`query: ${query}`);
        return query;
    })
    .catch((err:Error) => {
        console.log(`err: ${err}`);
        next(err);
    })
    if(result)
        res.sendStatus(200);
    else
        res.sendStatus(400);
}

export {githubOauthCallback};