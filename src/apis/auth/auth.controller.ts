import authService from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { handlerErrorRes } from '../../service/handleError.service';
import { IUserPostInfo } from '../../types/interfaces/user.interface';

class AuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const {Email, Password, RepeatPassword, Gender, Age, Role} = req.body;
            const newUser: IUserPostInfo = {Email, Password, RepeatPassword, Gender, Age, Role};

            const result = await authService.register(newUser);
            res.status(StatusCodes.OK).json({
                success: true,
                insertId: result
            });
        }catch(error: unknown){
            handlerErrorRes(error, res);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const {Email, Password} = req.body;
            const token = await authService.login({Email, Password});
            if(token){
                res.status(StatusCodes.OK).json({
                    success: true,
                    token: token
                });
            }
        }catch(error: unknown){
            handlerErrorRes(error, res);
        }
    }

    // async getMe(req: Request, res: Response, next: NextFunction): Promise<void>{
    //     try {
    //         res.status(StatusCodes.OK).json({
    //             success: true,
    //             UserId: req.user.id,
    //         });
    //     }catch(error: unknown){
    //         handlerErrorRes(error, res);
    //     }
    // }
}

export default new AuthController();