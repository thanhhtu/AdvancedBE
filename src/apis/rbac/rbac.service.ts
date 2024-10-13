import usersModel from '../../models/users.model';
import rbacModel from '../../models/rbac.model';
import CustomError from '../../service/customError.service';
// import { StatusCodes } from 'http-status-codes';
// import { IUserGetInfo, IUserPostInfo } from '../../types/user.interface';
import { errorInfo } from '../../service/handleError.service';

class RbacService{
    async getRolesOfUser(userId: number){
        try {
            await usersModel.getDetailUser(userId);
            const roles = await rbacModel.getRoleByUserID(userId);
            return roles;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getPermissionsOfRole(roleName: string){
        try {
            const roleId = await rbacModel.getRoleIDByRoleName(roleName);
            const permissions = await rbacModel.getPermissionsByRoleId(roleId);
            return permissions;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getPermissionsOfUser(userId: number){
        try {
            await usersModel.getDetailUser(userId);
            const permissions = await rbacModel.getPermissionsByUserId(userId);
            return permissions;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }
}

export default new RbacService();