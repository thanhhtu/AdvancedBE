import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction}  from 'express';
import rbacService from './rbac.service';
import { handlerErrorRes } from '../../service/handleError.service';
// import { IUserPostInfo } from '../../types/user.interface';

class RbacController {
    async getRolesOfUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const userId = Number(req.params.id);
            const roles = await rbacService.getRolesOfUser(userId);
            res.status(StatusCodes.OK).json({
                success: true,
                data: roles
            });            
        }catch(error){
            handlerErrorRes(error, res);
        }
    }

    async assignRoleToUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const userId = Number(req.params.id);
            const newRoles = req.body.Role;
            const result = await rbacService.assignRoleToUser(userId, newRoles);
            res.status(StatusCodes.OK).json({
                success: true,
                data: result
            });            
        }catch(error){
            handlerErrorRes(error, res);
        }
    }

    async deleteRoleFromUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const userId = Number(req.params.id);
            const delRoleIds = req.body.Role;
            const result = await rbacService.deleteRoleFromUser(userId, delRoleIds);
            res.status(StatusCodes.OK).json({
                success: true,
                data: result
            });            
        }catch(error){
            handlerErrorRes(error, res);
        }
    }
    
    async getPermissionsOfRole(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const roleName = req.params.roleName;
            const permissions = await rbacService.getPermissionsOfRole(roleName);
            res.status(StatusCodes.OK).json({
                success: true,
                data: permissions
            });            
        }catch(error){
            handlerErrorRes(error, res);
        }
    }

    async getPermissionsOfUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const userId = Number(req.params.id);
            const permissions = await rbacService.getPermissionsOfUser(userId);
            res.status(StatusCodes.OK).json({
                success: true,
                data: permissions
            });            
        }catch(error){
            handlerErrorRes(error, res);
        }
    }
}

export default new RbacController();