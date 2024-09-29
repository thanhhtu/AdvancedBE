import usersModel from '../../models/users.model.js'
import hashService from '../../service/hash.service.js'
import CustomError from '../../service/customError.service.js';
import { StatusCodes } from 'http-status-codes';
import userIdentityService from '../../service/authentication.service.js'
class AuthService{
    async register(user){
        try {
            const newUser = await usersModel.getUserByEmail(user.Email);
            if(newUser){
                throw new CustomError(StatusCodes.CONFLICT, 'Email already exists'); //409
            }
            
            const hashObj = await hashService.hashPassword(user.Password);
            user.Password = hashObj.hashedPassword;
            
            const result = await usersModel.createUser(user);
            console.log("a")
            return result;
        }catch(error){
            throw new CustomError(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async login(loginInfo){
        try {
            const user = await usersModel.getUserByEmail(loginInfo.Email);
            if(user == null){
                throw new CustomError(StatusCodes.NOT_FOUND, 'Email not found');
            }
            const check = await hashService.checkPassword(loginInfo.Password, user.Password);
            if(!check){
                console.log("oke")
                throw new CustomError(StatusCodes.UNAUTHORIZED, 'Wrong password'); //401
            }

            const token = await userIdentityService.encodeToken(user);
            await usersModel.setAccessToken(token, loginInfo.Email)
            return token;
        }catch(error){
            throw new CustomError(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }
}

export default new AuthService()
