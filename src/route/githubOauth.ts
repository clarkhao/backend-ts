import express from 'express';
import { githubOauthCallback } from '../controller';

const githubOauth = express.Router();

githubOauth.use('/auth/github/callback', githubOauthCallback)

export {githubOauth};