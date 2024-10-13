import { Request, Response, NextFunction } from 'express';
import rbacModel from '../models/rbac.model';
import { StatusCodes } from 'http-status-codes';

class RbacMiddleware{
    checkPermission(permission: string){
        return async (req: Request, res: Response, next: NextFunction) => {
            const userId = Number(req.user.id);
            
            const userPermissions = await rbacModel.getPermissionsByUserId(userId);
            if(userPermissions.includes(permission)){
                return next();
            }
            res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                error: 'Access denied',
            });
        }
    }
}

export default new RbacMiddleware();