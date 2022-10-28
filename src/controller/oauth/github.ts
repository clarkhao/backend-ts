import { RequestHandler } from "express";
import {getCodeFromGithub,
        getTokenFromGithub,
        getUserInfoWithToken,
        saveInfoInPG} from '../../service';
const config = require('config');

const githubOauthCallback: RequestHandler = async (req, res, next) => {
    getCodeFromGithub(req.query as Record<string,string>)
    .then( (code) => {
        console.log(`code: ${code}`);
        return getTokenFromGithub(code);
    }).then(token => {
        console.log(`token: ${token}`);
        return getUserInfoWithToken(token);
    }).then(info => {
        return saveInfoInPG(info);
    }).then(query => {
        console.log(query);
    })
    .catch((err:Error) => {
        console.log(`err: ${err}`);
        next(err);
    })
    res.redirect(config.get('frontend.home_page'));
}

export {githubOauthCallback};