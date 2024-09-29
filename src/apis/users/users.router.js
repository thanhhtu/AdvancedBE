import express from 'express';
import usersController from './users.controller.js';
import validateMiddleware from '../../middleware/validate.middleware.js';

const route = express.Router();

route.post(('/'), validateMiddleware.checkInput, usersController.createUser);

route.route('/:id')
    .put(validateMiddleware.checkInput, usersController.updateUser)
    .delete(usersController.deleteUser);

route.get(('/:id?'), usersController.getUser)

export default route;