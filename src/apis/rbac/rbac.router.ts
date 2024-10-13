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

/*
//CREATE ROLE
router.post('/', asyncHandler(RoleController.CreateRole))

//CREATE PERMISSION
router.post('/permission', asyncHandler(RoleController.CreatePermission))

//ASSIGN ROLE TO USER
router.post('/assign', asyncHandler(RoleController.AssignRoletoUser))

//ASSIGN PERMISSION TO ROLE
router.post('/permission/assign', asyncHandler(RoleController.AssignPermissiontoRole))

//DELETE PERMISSION FROM ROLE
router.delete('/permission-of-role', asyncHandler(RoleController.DeletePermissionfromRole))

//DELETE PERMISSION
router.delete('/permission', asyncHandler(RoleController.DeletePermission))

//DELETE ROLE
router.delete('/', asyncHandler(RoleController.DeleteRole))
*/

export default route;