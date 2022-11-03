import {GithubUser} from './prismaModel';
const config = require('config');
import {PGConnect} from '../../utils';

class OauthUser implements GithubUser {
    id: number;
    name: string;
    githubId: number;
    githubRepos: number;
    db: PGConnect;
    public constructor(name:string,id:number,num?:number) {
        this.id = 0;
        this.name = name;
        this.githubId = id;
        this.githubRepos = num || 0;
        this.db = new PGConnect(process.env[config.get('db.db_graph.name')] || '');
    }
    public createUser() {
        return this.db.dbConnect(`
            insert into auth.github_user (name,github_id,github_repos) 
            values ($1,$2,$3) 
            on conflict (name) 
            do update set github_repos=$3;`,
        [this.name,this.githubId,this.githubRepos]);
    }
    public checkUser() {
        return this.db.dbConnect(`select * from auth.github_user;`);
    }
}

export {OauthUser};