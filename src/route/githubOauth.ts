import express from 'express';
import { readCode } from '../controller';

const githubOauth = express.Router();

githubOauth.use('/auth/github/callback', readCode)

export {githubOauth};