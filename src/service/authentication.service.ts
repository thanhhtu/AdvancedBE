import jwt from 'jsonwebtoken';
import { IPayload, IUser } from '../types/interfaces/user.interface';
import 'dotenv/config';
import CustomError from './customError.service';
import { StatusCodes } from 'http-status-codes';

class UserIdentityService {
    async encodeToken(user: IUser) {
        return jwt.sign(
            { 
                id: user.UserID
            }, 
            process.env.JWT_SECRET!, 
            {
                expiresIn: process.env.JWT_EXPIRES_IN!,
                algorithm: 'HS256',
            }
        )
    }

    async decodeToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET!) as IPayload; //! is non null
    }
}

export default new UserIdentityService()
