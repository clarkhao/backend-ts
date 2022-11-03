import express from 'express';
import { githubOauthCallback } from '../controller';

const githubOauth = express.Router();

githubOauth.get('/auth/github/callback', githubOauthCallback)

export {githubOauth};