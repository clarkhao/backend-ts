import {OauthUser,GithubUser} from '../../model';
import {db} from '../../utils'
import {OauthUserType} from '../../model'

//saved user info from github inside the db
const saveGithubUserInfo = (info: GithubUser) => {
    //connect to db by OauthUser
    const oauth:OauthUserType = new OauthUser(db,info['name'],info['githubId'],info['githubRepos']);
    return oauth.createUser()
        .then(query => {
            if(typeof query === 'boolean' && query)
                return Promise.resolve(query.toString());
            else {
                return Promise.reject(new Error('failed to write into db with github user info'))
            }
        });
}

const readAllGithubUser = () => {
    const oauth:OauthUserType = new OauthUser(db);
    return oauth.checkUser().then(query => {
        if(query.length > 0)
            return Promise.resolve(query);
        else {
            return Promise.reject(new Error('failed to write into db with github user info'))
        }
    });
}

export {saveGithubUserInfo,readAllGithubUser};