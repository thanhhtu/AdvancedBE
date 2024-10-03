import express from 'express';
import userRoute from './users/users.router';
import authRoute from './auth/auth.router';

const router = express.Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);

export default router;