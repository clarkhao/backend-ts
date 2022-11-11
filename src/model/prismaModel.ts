/**
 * Model User
 */
type User = {
    id: number
    name: string
    githubUserId: number | null
    email: string | null
}
/**
 * Model GithubUser
 */
type GithubUser = {
    id: number
    githubId: number
    githubRepos: number
}
/**
 * Model EmailUser
 */
type EmailUser = {
    id: number
    email: string
    salt: string
    hash: string
    createAt: Date
    lastUpdateAt: Date
}
/**
 * Model Token
 */
type Token = {
    id: number
    role: Role
    emailToken: string | null
    userId: number
}
/**
 * Enums
 */
enum Role {
    Unlogged = 'Unlogged',
    User = 'User',
    Admin = 'Admin'
};

export {User,GithubUser,EmailUser,Token,Role};