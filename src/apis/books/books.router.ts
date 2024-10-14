import express from 'express';
import booksController from './books.controller';
import rbacMiddleware from '../../middleware/rbac.middleware';
import validateMiddleware from '../../middleware/validate.middleware';
import { PermissionObject } from '../../types/rbac.data';
import verifyMiddleware from '../../middleware/verify.middleware';

const route = express.Router();

route.use('/:id', validateMiddleware.checkNumberParam)
route.use(verifyMiddleware.checkAuth)

route.get('/:id?', rbacMiddleware.checkPermission(PermissionObject.VIEW_BOOKS), booksController.viewBooks);

route.post('/', validateMiddleware.checkInputBook, rbacMiddleware.checkPermission(PermissionObject.ADD_BOOKS), booksController.addBooks);

route.delete('/:id', rbacMiddleware.checkPermission(PermissionObject.DELETE_BOOKS), booksController.deleteBook);

export default route;