import authService from './auth.service.js';
import { StatusCodes } from 'http-status-codes';

class AuthController {
    async register(req, res, next){
        try{
            const {Email, Password, RepeatPassword, Gender, Age, Role} = req.body;
            const newUser = {Email, Password, RepeatPassword, Gender, Age, Role};
            
            const result = await authService.register(newUser);
            
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

    async login(req, res, next){
        try{
            const {Email, Password} = req.body;
            const token = await authService.login({Email, Password});
            console.log(token)
            if(token){
                return res.status(StatusCodes.OK).json({
                    success: true,
                    token: token
                });
            }
        }catch(error){
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
    }

    async getMe(req, res, next) {
        try {
            return res.status(StatusCodes.OK).json({
                success: true,
                UserId: req.user.id,
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new AuthController();