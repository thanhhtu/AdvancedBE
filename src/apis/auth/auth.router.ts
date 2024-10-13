import express from 'express';
import authController from './auth.controller';
import validateMiddleware from '../../middleware/validate.middleware';
import verifyMiddleware from '../../middleware/verify.middleware';

const route = express.Router();

route.post('/register', validateMiddleware.checkInputUser, authController.register);
route.post('/login', validateMiddleware.checkLogin, authController.login);
route.get('/me', verifyMiddleware.checkAuth, authController.getMe);

export default route;