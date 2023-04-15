import {OauthUser,Github,ID} from '../../model';
import {db} from '../../utils';
import {OauthUserType} from '../../model';

//saved user info from github inside the db
const saveGithubUserInfo = (info: Github) => {
    //connect to db by OauthUser
    console.log(info);
    const oauth:OauthUserType<ID,Github> = new OauthUser(db,info['name'],info['githubId'],info['githubRepos']);
    return oauth.createUser()
        .then(query => {
            if(typeof query !== 'boolean' && query?.length > 0) 
                return Promise.resolve(query[0]);
            else {
                return Promise.reject(new Error('failed to write into db with github user info'))
            }
        });
}

const readAllGithubUser = () => {
    const oauth:OauthUserType<ID,Github> = new OauthUser(db);
    return oauth.readAllUsers().then(query => {
        if(query?.length > 0)
            return Promise.resolve(query);
        else {
            return Promise.reject(new Error('failed to read github user info'))
        }
    });
}

export {saveGithubUserInfo,readAllGithubUser};