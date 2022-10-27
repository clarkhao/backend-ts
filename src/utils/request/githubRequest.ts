import { AbstractAPI } from "./abstractAPI";

class GithubAPI extends AbstractAPI {
    private client_id: string;
    private client_secret: string;
    private code: string;
    public constructor(code?:string) {
        super('https://github.com');
        this.client_id = process.env.GITHUB_CLIENT_ID || '';
        this.client_secret = process.env.GITHUB_CLIENT_SECRET || '';
        this.code = code || '';
    }
    public fetchTokenFromGithub() {
        return this.http.post(this.baseURL.concat('/login/oauth/access_token'), 
            this.paramsSerialized({
                client_id: this.client_id,
                client_secret: this.client_secret,
                code: this.code
            })).then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }
    public fetchUserInfoWithToken(token: string) {
        return this.http.get('https://api.github.com/user',{
            headers: {
              Authorization: `Bearer ${token}`
            },
          }).then(this.handleResponse.bind(this))
          .catch(this.handleError.bind(this));
    }
}

export {GithubAPI};