import express from 'express';
import userRoute from './users/users.router';
import authRoute from './auth/auth.router';
import rbac from './rbac/rbac.router';
import books from './books/books.router';

const router = express.Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/rbac', rbac);
router.use('/books', books);

export default router;