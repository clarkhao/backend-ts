import { RequestHandler } from "express";
import {getCodeFromGithub,getTokenFromGithub,getUserInfoWithToken} from '../../service'

const githubOauthCallback: RequestHandler = async (req, res, next) => {
    getCodeFromGithub(req.query as Record<string,string>)
    .then( (code) => {
        console.log(`code: ${code}`);
        return getTokenFromGithub(code);
    }).then(token => {
        console.log(`token: ${token}`);
        return getUserInfoWithToken(token);
    })
    .catch((err:Error) => {
        console.log(`err: ${err}`);
        next(err);
    })
    res.redirect('http://192.168.3.55:3000');
}

export {githubOauthCallback};