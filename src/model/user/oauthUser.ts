import {GithubUser} from './prismaModel';
const config = require('config');
import {db} from '../../utils';

class OauthUser implements GithubUser {
    id: number;
    name: string;
    githubId: number;
    githubRepos: number;
    public constructor(name:string,id:number,num?:number) {
        this.id = 0;
        this.name = name;
        this.githubId = id;
        this.githubRepos = num || 0;
    }
    public createUser() {
        return db.connect(`
            insert into auth.github_user (name,github_id,github_repos) 
            values ($1,$2,$3) 
            on conflict (name) 
            do update set github_repos=$3;`,
        [this.name,this.githubId,this.githubRepos]);
    }
    public checkUser() {
        return db.connect(`select * from auth.github_user;`);
    }
}

export {OauthUser};