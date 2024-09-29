import express from 'express';
import userRoute from './users/users.router.js';
// import authRoute from './auth/auth.router.js';

const router = express.Router();

router.use('/users', userRoute);
// router.use('/auth', authRoute);

export default router;