import express from 'express';
import {signUpRepeatInfo,sendEmail} from '../../controller';
import {Authentication} from '../../middleware';

const authRouter = express.Router();
/**
 * @swagger
 * /signup:
 *   post:
 *     description: user sign up with name, email and pwd
 *     requestBody:
 *       description: user information post for signup 
 *       content:
 *         application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              secret: 
 *                type: string
 *              sign:
 *                type: string
 *              data:
 *                type: string
 *     responses:
 *       200:
 *         description: sign up successfully.
 *         content:
 *           application/json:
 *             type: Object
 *             properties:
 *               message:
 *                 type: string
 *       401:
 *         description: bad authentication
 *       404:
 *         description: bad email
 *       409:
 *         description: already used name or email
 *       500:
 *         description: server mistake
 */
authRouter.post('/signup', Authentication, signUpRepeatInfo, sendEmail);
//authRouter.get('/signup/auth/email')

export {authRouter};