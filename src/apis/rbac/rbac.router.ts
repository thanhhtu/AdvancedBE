import express from 'express';
import rbacController from './rbac.controller';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();

//Roles
//get roles of a user
route.get('/roles/:id', validateMiddleware.checkNumberParam, rbacController.getRolesOfUser);

//Permission
//get permissions of a role
route.get('/permissions/:roleName', rbacController.getPermissionsOfRole);
//get permissions of a user
route.get('/permissions/user/:id', validateMiddleware.checkNumberParam, rbacController.getPermissionsOfUser);


export default route;