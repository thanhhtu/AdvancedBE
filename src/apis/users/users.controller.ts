import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction}  from 'express';
import usersService from './users.service';
import { handlerErrorRes } from '../../service/handleError.service';
import { IUserPostInfo } from '../../types/user.interface';

class UsersController {
    async getUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            let users;
            const userId = Number(req.params.id);
            if(userId){
                users = await usersService.getDetailUser(userId);
            }else{
                users = await usersService.getUsers();
            }
            res.status(StatusCodes.OK).json({
                success: true,
                data: users
            });
        }catch(error: unknown){
            handlerErrorRes(error, res);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const {Email, Password, RepeatPassword, Gender, Age, Role} = req.body;
            const newUser: IUserPostInfo = {Email, Password, RepeatPassword, Gender, Age, Role};

            const result = await usersService.createUser(newUser);
            res.status(StatusCodes.OK).json({
                success: true,
                insertId: result
            });
        }catch(error: unknown){
            handlerErrorRes(error, res);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const userID = Number(req.params.id);
            const {Email, Password, RepeatPassword, Gender, Age, Role} = req.body;
            const updateUser: IUserPostInfo = {Email, Password, RepeatPassword, Gender, Age, Role};

            const result = await usersService.updateUser(updateUser, userID);
            res.status(StatusCodes.OK).json({
                success: true,
                affectRows: result
            });
        }catch(error: unknown){
            handlerErrorRes(error, res);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const userId = Number(req.params.id);
            const result = await usersService.deleteUser(userId);
            res.status(StatusCodes.OK).json({
                success: true,
                affectRows: result
            });
        }catch(error: unknown){
            handlerErrorRes(error, res);
        }
    }
}

export default new UsersController();