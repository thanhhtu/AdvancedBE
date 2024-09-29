import { StatusCodes } from 'http-status-codes'
import usersService from './users.service.js';

class UsersController {
    async getUser(req, res, next){
        try{
            let users;
            const userId = req.params.id;
            if(userId){
                users = await usersService.getDetailUser(userId);
            }else{
                users = await usersService.getUsers();
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                data: users
            });
        }catch(error){
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
    }

    async createUser(req, res, next){
        try{
            const {Email, Password, RepeatPassword, Gender, Age, Role} = req.body;
            const newUser = {Email, Password, RepeatPassword, Gender, Age, Role};

            const result = await usersService.createUser(newUser);
            return res.status(StatusCodes.OK).json({
                success: true,
                insertId: result
            });
        }catch(error){
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateUser(req, res, next){
        try{
            const UserID = req.params.id;
            const {Email, Password, RepeatPassword, Gender, Age, Role} = req.body;
            const updateUser = {UserID, Email, Password, RepeatPassword, Gender, Age, Role};

            const result = await usersService.updateUser(updateUser);
            return res.status(StatusCodes.OK).json({
                success: true,
                affectRows: result
            });
        }catch(error){
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteUser(req, res, next){
        try{
            const userId = req.params.id;
            const result = await usersService.deleteUser(userId);
            return res.status(StatusCodes.OK).json({
                success: true,
                affectRows: result
            });
        }catch(error){
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new UsersController();