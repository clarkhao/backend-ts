import express from 'express';

const authRouter = express.Router();
/**
 * @swagger
 * /signup:
 *   post:
 *     description: user sign up with name, email and pwd
 *     responses:
 *       200:
 *         description: sign up successfully.
 */
authRouter.post('/signup');

export {authRouter};