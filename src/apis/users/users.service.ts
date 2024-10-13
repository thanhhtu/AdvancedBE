import usersModel from '../../models/users.model';
import hashService from '../../service/hash.service'
import CustomError from '../../service/customError.service';
import { StatusCodes } from 'http-status-codes';
import { IUserGetInfo, IUserPostInfo } from '../../types/user.data';
import { errorInfo } from '../../service/handleError.service';

class UsersService{
    async getInfo(user: IUserGetInfo){
        user.Gender = user.Gender == '0' ? 'man' : 'woman';
        // user.Role = user.Role == '1' ? 'admin' : 'user';
    }

    async getUsers(){
        try {
            const users = await usersModel.getUsers();
            for(let user of users){
                await this.getInfo(user);
            }
            return users;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getDetailUser(userId: number){
        try {
            const user = await usersModel.getDetailUser(userId);
            await this.getInfo(user);
            return user;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }
    
    async createUser(user: IUserPostInfo){
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
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async updateUser(user: IUserPostInfo, userID: number){
        try {
            const updateUser = await usersModel.getDetailUser(userID);
            if(user.Email != updateUser.Email){
                throw new CustomError(StatusCodes.BAD_REQUEST, 'This is not your email'); //400
            }
            
            const hashObj = await hashService.hashPassword(user.Password);
            user.Password = hashObj.hashedPassword;
            const result = await usersModel.updateUser(user, userID);
            return result;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async deleteUser(userId: number){
        try {
            await usersModel.getDetailUser(userId);

            const result = await usersModel.deleteUser(userId);
            return result;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }
}

export default new UsersService();