import { RequestHandler } from "express";
import {getCodeFromGithub} from '../../service'

const githubOauthCallback: RequestHandler = async (req, res, next) => {
    getCodeFromGithub(req.query as Record<string,string>)
    .then( () => {
        console.log('middle')
    })
    .catch((err:Error) => {
        console.log(`err: ${err}`);
        res.redirect(process.env.LOGIN_PAGE || '');
        next(err);
    })
}

export {githubOauthCallback};