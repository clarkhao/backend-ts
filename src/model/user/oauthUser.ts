import {GithubUser} from './prismaModel';
const config = require('config');
import {db,PGConnect} from '../../utils';

interface OauthUserType {
    createUser(): Promise<boolean>,
    checkUser(): Promise<GithubUser[]>
}

class OauthUser implements GithubUser {
    id: number;
    name: string;
    githubId: number;
    githubRepos: number;
    private users: GithubUser[] = [];
    db: PGConnect;
    //db is the depencency injection
    public constructor(db:PGConnect,name?:string,id?:number,num?:number) {
        this.id = 0;
        this.name = name || '';
        this.githubId = id || 0;
        this.githubRepos = num || 0;
        this.db = db;
    }
    public createUser() {
        return this.db.connect(`
            insert into auth.github_user (name,"githubId","githubRepos") 
            values ($1,$2,$3) 
            on conflict (name) 
            do update set "githubRepos"=$3;`,
        [this.name,this.githubId,this.githubRepos])
        .then(res => {
            return res as boolean;
        });
    }
    public checkUser() {
        return this.db.connect<GithubUser>(`select * from auth.github_user;`)
        .then(res => {
            return res as GithubUser[];
        })
        .then(infos => {
            infos.forEach(value => {
                this.users.push({
                    id: value['id'],
                    name: value['name'],
                    githubId: value['githubId'],
                    githubRepos: value['githubRepos']
                });
            })
            return this.users;
        });
    }
}

export {OauthUser,OauthUserType};