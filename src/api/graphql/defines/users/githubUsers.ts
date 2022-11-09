import { objectType, extendType } from "nexus";
import {readAllGithubUser} from '../../../../service';

const GithubUserGraph = objectType({
    name: 'GithubUserGraph',
    definition(t) {
        t.nonNull.int('id', {description: 'Id of table github_user'})
        t.string('name', {description: 'Name of github_user'})
        t.int('githubId', {description: 'github user ID of github'})
        t.int('githubRepos', {description: 'github repository number of user'})
    }
})
const GithubUserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('allGithubUsers', {
            type: GithubUserGraph,
            async resolve() {
                return await readAllGithubUser();
            }
        })
    }
})

export {GithubUserQuery};