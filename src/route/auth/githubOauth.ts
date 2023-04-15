import express from 'express';
import { githubOauthCallback,sendOauthToken } from '../../controller';

const githubOauth = express.Router();
/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     description: github oauth login
 *     responses:
 *       200:
 *         description: successfully login with the github oauth account
 *       400:
 *         description: failed to log in 
 *         content:
 *           application/json:
 *             type: Object
 *             properties:
 *               message:
 *                 type: string
 */
githubOauth.get('/auth/github/callback', githubOauthCallback, sendOauthToken);

export {githubOauth};