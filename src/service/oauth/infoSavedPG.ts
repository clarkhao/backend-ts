import {OauthUser,GithubUser} from '../../model';

//saved user info from github inside the db
const saveInfoInPG = (info: GithubUser) => {
    //connect to db by OauthUser
    const oauth = new OauthUser(info['name'],info['githubId'],info['githubRepos']);
    return oauth.createUser()
        .then(query => {
            if(typeof query === 'boolean' && query)
                return Promise.resolve(query.toString());
            else if(typeof query !== 'boolean' && query.length > 0) {
                return Promise.resolve(JSON.stringify(query));
            } else {
                return Promise.reject(new Error('failed to write into db with github user info'))
            }
        });
}

export {saveInfoInPG};