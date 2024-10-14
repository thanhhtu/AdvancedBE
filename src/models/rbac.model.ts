import { ResultSetHeader } from 'mysql2';
import pool from '../config/database.config';
import CustomError from '../service/customError.service';
import { errorInfo } from '../service/handleError.service';
import { IRole, IRolePermission, IUserRole } from '../types/rbac.data';
import { StatusCodes } from 'http-status-codes';

class RbacModel {
    async getRoleByUserID(userId: number){
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IUserRole[]>(`SELECT *
                                                                FROM users_roles ur
                                                                JOIN roles r ON ur.RoleID = r.RoleID
                                                                WHERE ur.UserID = ? `, userId);
            const result = rows.map((role: IUserRole) => role.RoleName)
            connection.release();
            return result;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async addRoleToUser(userId: number, newRoleIds: number[]){
        try{
            const connection = await pool.getConnection();
            if (newRoleIds.length > 0) {
                const values = newRoleIds.map(roleId => `(${userId}, ${roleId})`).join(', ');
                await connection.query<ResultSetHeader>(`INSERT INTO users_roles (UserID, RoleID) VALUES ${values};`);
            }
            connection.release();
            return true;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async deleteRoleFromUser(userId: number, delRoleId: number){
        try{
            const connection = await pool.getConnection();
            
            // if (delRoleIds.length > 1) {
            //     const valuesToDelete = delRoleIds.slice(0, -1).join(', '); //Del except the last element
            
            //     await connection.query<ResultSetHeader>(
            //         `DELETE FROM users_roles WHERE UserID = ? AND RoleID IN (${valuesToDelete});`,
            //         [userId]
            //     );
            // }
            
            await connection.query<ResultSetHeader>(`DELETE FROM users_roles WHERE UserID = ? AND RoleID = ?`,  [userId, delRoleId]);
            connection.release();
            return true;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getRoleIDByRoleName(roleName: string){
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IRole[]>('SELECT * FROM roles WHERE RoleName = ?', roleName);
            if(rows[0] == null){
                throw new CustomError(StatusCodes.NOT_FOUND, 'Role not found'); //404
            }

            connection.release();
            return rows[0].RoleID;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getPermissionsByRoleId(roleId: number){
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IRolePermission[]>(`SELECT * 
                                                                    FROM roles_permissions rp
                                                                    JOIN permissions p ON rp.PermissionID = p.PermissionID
                                                                    WHERE rp.RoleID = ? `, roleId);
            const result = rows.map((permission: IRolePermission) => permission.PermissionName)
            connection.release();
            return result;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getPermissionsByUserId(userId: number){
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IRolePermission[]>(`SELECT * 
                                                                    FROM users u
                                                                    JOIN users_roles ur ON u.UserID = ur.UserID
                                                                    JOIN roles r ON ur.RoleID = r.RoleID
                                                                    JOIN roles_permissions rp ON r.RoleID = rp.RoleID
                                                                    JOIN permissions p ON rp.PermissionID = p.PermissionID
                                                                    WHERE u.UserID = ?`, userId);

            const result = rows.map((permission: IRolePermission) => permission.PermissionName)
            connection.release();
            return result;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }
}

export default new RbacModel()