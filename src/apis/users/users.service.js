import usersModel from '../../models/users.model.js';
import hashService from '../../service/hash.service.js'
import CustomError from '../../service/customError.service.js';
import { StatusCodes } from 'http-status-codes';

class UsersService{
    async getInfo(user){
        user.Gender = user.Gender === 0 ? 'man' : 'woman';
        user.Role = user.Role === 0 ? 'admin' : 'user';
    }

    async getUsers(){
        try {
            const users = await usersModel.getUsers();
            for(let user of users){
                await this.getInfo(user);
            }
            return users;
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async getDetailUser(userId){
        try {
            const user = await usersModel.getDetailUser(userId);
            if(user == null){
                throw new CustomError(StatusCodes.NOT_FOUND, 'User not found'); //404
            }
            await this.getInfo(user);
            return user;
        }catch(error){
            throw new CustomError(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    
    async createUser(user){
        try {
            const newUser = await usersModel.getUserByEmail(user.Email);
            if(newUser){
                throw new CustomError(StatusCodes.CONFLICT, 'Email already exists'); //409
            }

            const hashObj = await hashService.hashPassword(user.Password);
            user.Password = hashObj.hashedPassword;

            const result = await usersModel.createUser(user);
            return result;
        }catch(error){
            throw new CustomError(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async updateUser(user){
        try {
            const updateUser = await usersModel.getDetailUser(user.UserID);
            if(updateUser == null){
                throw new CustomError(StatusCodes.NOT_FOUND, 'User not found'); //404
            }else if(user.Email != updateUser.Email){
                throw new CustomError(StatusCodes.BAD_REQUEST, 'This is not your email'); //400
            }
            
            const hashObj = await hashService.hashPassword(user.Password);
            user.Password = hashObj.hashedPassword;
            const result = await usersModel.updateUser(user);
            return result;
        }catch(error){
            throw new CustomError(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async deleteUser(userId){
        try {
            const updateUser = await usersModel.getDetailUser(userId);
            if(updateUser == null){
                throw new CustomError(StatusCodes.NOT_FOUND, 'User not found'); //404
            }

            const result = await usersModel.deleteUser(userId);
            return result;
        }catch(error){
            throw new CustomError(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }
}

export default new UsersService();