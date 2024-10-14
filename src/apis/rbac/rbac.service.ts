import usersModel from '../../models/users.model';
import rbacModel from '../../models/rbac.model';
import CustomError from '../../service/customError.service';
// import { StatusCodes } from 'http-status-codes';
// import { IUserGetInfo, IUserPostInfo } from '../../types/user.interface';
import { errorInfo } from '../../service/handleError.service';
import { StatusCodes } from 'http-status-codes';
import { RoleArray } from '../../types/rbac.data';

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

    async assignRoleToUser(userId: number, newRoles: string[]){
        try {
            await usersModel.getDetailUser(userId);
            const roles = await rbacModel.getRoleByUserID(userId);
            
            for(let role of roles){
                if (newRoles.includes(role)){
                    throw new CustomError(StatusCodes.CONFLICT, `User already has role ${role}`);
                }
            }

            const newRoleIds: number[] = await Promise.all(
                newRoles.map(async (role: string) => {
                    return Number(await rbacModel.getRoleIDByRoleName(role));
                })
            );

            const result = await rbacModel.addRoleToUser(userId, newRoleIds);
            
            return result;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async deleteRoleFromUser(userId: number, delRole: string){
        try {
            await usersModel.getDetailUser(userId);
            const roles = await rbacModel.getRoleByUserID(userId);
            if(roles.length == 1){
                throw new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, 'Can not delete! User only has a role');
            }

            if (!roles.includes(delRole)){
                throw new CustomError(StatusCodes.CONFLICT, `User does not have role ${delRole}`);
            }
            

            const delRoleId: number = await  Number(await rbacModel.getRoleIDByRoleName(delRole));
               

            const result = await rbacModel.deleteRoleFromUser(userId, delRoleId);
            
            return result;
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