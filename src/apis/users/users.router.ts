import express from 'express';
import usersController from './users.controller';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();

route.get('/:id?', usersController.getUser);

route.post('/', validateMiddleware.checkInput, usersController.createUser);

route.route('/:id')
    .put(validateMiddleware.checkInput, usersController.updateUser)
    .delete(usersController.deleteUser);

export default route;