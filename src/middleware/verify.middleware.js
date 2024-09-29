import userIdentityService from '../service/authentication.service.js'
import usersModel from '../models/users.model.js';
import { StatusCodes } from 'http-status-codes';

class VerifyMiddleware {
    async checkAuth(req, res, next) {
        try {
            
            let token = req.headers.authorization;
            token = token.split(' ')[1];
            req.user = await userIdentityService.decodeToken(token);
            
            if (token != await usersModel.getAccessTokenByUserID(req.user.id)) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: 'Not login yet',
                });
            }

            next();
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new VerifyMiddleware()
