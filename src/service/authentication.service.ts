import jwt from 'jsonwebtoken';
import { IUser } from '../types/user.interface';
import 'dotenv/config';

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

    async decodeToken(token: string){
        return jwt.verify(token, process.env.JWT_SECRET!) as Record<string, any>; //! is non null
    }
}

export default new UserIdentityService()
