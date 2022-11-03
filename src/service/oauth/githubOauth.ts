import {GithubAPI} from '../../utils';
import { GithubUser } from '@prisma/client';

//get code from github after customer logged in github with oauth
const getCodeFromGithub = (query: Record<string,string>) => {
    const params = new URLSearchParams(query);
    //maybe return null
    return new Promise<string>((resolve,reject) => {
        if(params.get('code'))
            return resolve(params.get('code') as string);
        else
            return reject('code from Github is null');
    })
}
//get github token with async http request.
const getTokenFromGithub = (code: string) => {
    const githubAPI = new GithubAPI(code);
    return githubAPI.fetchTokenFromGithub().then(token => {
        const tokenOrErr = new URLSearchParams(token);
        if(tokenOrErr.get('access_token'))
            return Promise.resolve(tokenOrErr.get('access_token') as string);
        else
            return Promise.reject(tokenOrErr.get('error') as string);
    })
}
//get github user info with token
const getUserInfoWithToken = (token: string) => {
    const githubAPI = new GithubAPI();
    return githubAPI.fetchUserInfoWithToken(token).then(info => {
        const userInfo = new URLSearchParams(info);
        if(userInfo.get('login'))
            return Promise.resolve({id:0,name:userInfo.get('login') || '',githubId: parseInt(userInfo.get('id') || ''), githubRepos: parseInt(userInfo.get('public_repos') || '')} as GithubUser);
        else
            return Promise.reject('failed to fetch user info from github with token');
    })
}

export { getCodeFromGithub,getTokenFromGithub,getUserInfoWithToken };