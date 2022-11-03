import {OauthUser} from '../../model';
import { GithubUser } from '@prisma/client';

//saved user info from github inside the db
const saveInfoInPG = (info: GithubUser) => {
    //connect to db by OauthUser
    const oauth = new OauthUser(info['name'],info['githubId'],info['githubRepos']);
    return oauth.createUser();
}

export {saveInfoInPG};