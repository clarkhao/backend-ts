import { GithubUser,PrismaClient } from '@prisma/client';
const config = require('config');

class OauthUser implements GithubUser {
    id: number;
    name: string;
    githubId: number;
    githubRepos: number;
    prisma: PrismaClient;
    public constructor(name:string,id:number,num?:number) {
        this.id = 0;
        this.name = name;
        this.githubId = id;
        this.githubRepos = num || 0;
        this.prisma = new PrismaClient();
    }
    public createUser(): Promise<number> {
        return this.prisma.$executeRaw`
        insert into github_user (name,github_id,github_repos)
        values (${this.name},${this.githubId},${this.githubRepos})
        on conflict (name)
        do
            update set github_repos=${this.githubRepos};`
    }
}

export {OauthUser};