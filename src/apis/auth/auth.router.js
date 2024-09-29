import express from 'express';
import authController from './auth.controller.js';
import validateMiddleware from '../../middleware/validate.middleware.js';
import verifyMiddleware from '../../middleware/verify.middleware.js';

const route = express.Router();

route.post('/register', validateMiddleware.checkInput, authController.register);
route.post('/login', validateMiddleware.checkLogin, authController.login);
route.get('/me', verifyMiddleware.checkAuth, authController.getMe);

export default route;