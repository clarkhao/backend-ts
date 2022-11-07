import express from 'express';
import { githubOauthCallback } from '../controller';

const githubOauth = express.Router();
/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     description: github oauth login
 *     responses:
 *       200:
 *         description: OK.
 */
githubOauth.get('/auth/github/callback', githubOauthCallback)

export {githubOauth};