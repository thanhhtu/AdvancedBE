import express from 'express';
import rbacController from './rbac.controller';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();

//Roles
route.route('/roles/:id')
    //get roles of a user
    .get(validateMiddleware.checkNumberParam, rbacController.getRolesOfUser)
    //assign a role to a user
    .post(validateMiddleware.checkNumberParam, validateMiddleware.checkRoleArray, rbacController.assignRoleToUser)
    //delete role from a user
    .delete(validateMiddleware.checkNumberParam, validateMiddleware.checkRoleItem, rbacController.deleteRoleFromUser)

//Permission
//get permissions of a role
route.get('/permissions/:roleName', rbacController.getPermissionsOfRole);
//get permissions of a user
route.get('/permissions/user/:id', validateMiddleware.checkNumberParam, rbacController.getPermissionsOfUser);

export default route;