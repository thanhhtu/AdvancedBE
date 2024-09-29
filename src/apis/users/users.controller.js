import {StatusCodes} from 'http-status-codes'
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
            return res.status(200).json({
                success: true,
                data: users
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createUser(req, res, next){
        try{
            const newUser = {
                Email: req.body.Email,
                Password: req.body.Password,
                RepeatPassword: req.body.Password,
                Gender: req.body.Gender,
                Age: req.body.Age,
                Role: req.body.Role
            }
            const result = await usersService.createUser(newUser);
            return res.status(StatusCodes.OK).json({
                success: true,
                insertId: result
            });
        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateUser(req, res, next){
        try{
            const updateUser = {
                UserID: req.params.id,
                Email: req.body.Email,
                Password: req.body.Password,
                RepeatPassword: req.body.Password,
                Gender: req.body.Gender,
                Age: req.body.Age,
                Role: req.body.Role
            }
            const result = await usersService.updateUser(updateUser);
            return res.status(StatusCodes.OK).json({
                success: true,
                affectRows: result
            });
        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({
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
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new UsersController();