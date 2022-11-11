import { RequestHandler } from "express";
import {getCodeFromGithub,
        getTokenFromGithub,
        getUserInfoWithToken,
        saveGithubUserInfo,
        sendToken} from '../../service';

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
        return saveGithubUserInfo(info);
    }).then(query => {
        console.log(`query: ${query}`);
        return query;
    })
    .catch((err:Error) => {
        console.log(`error: ${err}`);
        next(err);
        return err;
    })
    if(!(result instanceof Error)) {
        res.locals.id = result;
        next();
    } else if(result instanceof Error) {
        res.status(400).json({message: 'failed to login'});
    }
}

const sendOauthToken: RequestHandler = async (req, res, next) => {
    const token = await sendToken(res.locals.id);
    res.cookie('token', token, { expires: new Date(Date.now() + 120000), httpOnly: true, secure: true, sameSite: 'none' })
    .sendStatus(200);
}

export {githubOauthCallback,sendOauthToken};