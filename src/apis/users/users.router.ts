import express from 'express';
import usersController from './users.controller';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();

route.use('/:id', validateMiddleware.checkNumberParam)

route.get('/:id?', usersController.getUser);

route.post('/', validateMiddleware.checkInputUser, usersController.createUser);

route.route('/:id')
    .put(validateMiddleware.checkInputUser, usersController.updateUser)
    .delete(usersController.deleteUser);

export default route;