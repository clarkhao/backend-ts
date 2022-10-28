import {User} from './userType';
import {PGConnect} from '../../utils';
const config = require('config');

class OauthUser implements User {
    private name: string;
    private user_id: string;
    private github_repos_num: number;
    private pool: PGConnect; 
    public constructor(source:string,name:string,id:number,num?:number) {
        this.name = source.concat(name);
        this.user_id = source.concat(id.toString());
        this.github_repos_num = num || 0;
        this.pool = new PGConnect(process.env[config.get('db.oauth_user_db.name')] || '');
    }
    public checkUser(name: string) {
        return this.pool.dbConnect(`
        select name from some where name=${this.name};
        `).then(res => {
            return res.length > 0;
        }).catch(err => {
            throw new Error(err);
        })
    };
}

export {OauthUser};