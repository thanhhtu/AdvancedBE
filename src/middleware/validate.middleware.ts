import {StatusCodes} from 'http-status-codes';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { handlerErrorRes } from '../service/handleError.service';
import { RoleArray } from '../types/rbac.data';
import rbacModel from '../models/rbac.model';

class ValidateMiddleware {
    async checkInputUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validateInput = Joi.object({
                Email: Joi.string()
                        .email({ minDomainSegments: 2 })
                        .trim()
                        .required(),
                
                Password: Joi.string()
                            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                            .trim()
                            .required(),
                
                RepeatPassword: Joi.ref('Password'),
                
                Gender: Joi.string()
                        .valid('man', 'woman')
                        .trim()
                        .required(),
                
                Age: Joi.number()           
                        .integer()
                        .min(0)
                        .max(200)
                        .required(),
                
                Role: Joi.array()
                        .items(Joi.string().valid(...RoleArray))
                        .unique()                
            })
            .with('Password', 'RepeatPassword');

            await validateInput.validateAsync(req.body, { abortEarly: false });
            
            req.body.Gender = (req.body.Gender == "woman" ? 1 : 0);
            if(req.body.Role){
                req.body.Role = await Promise.all(
                    (req.body.Role).map(async (role: string) => {
                        return Number(await rbacModel.getRoleIDByRoleName(role));
                    })
                );
            }

            next();
        } catch (error: unknown) {
            handlerErrorRes(error, res);
        }
    }

    async checkInputBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validateInput = Joi.object({
                Name: Joi.string()
                            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                            .trim()
                            .required(),
            })

            await validateInput.validateAsync(req.body, { abortEarly: false });
            
            next();
        } catch (error: unknown) {
            handlerErrorRes(error, res);
        }
    }


    async checkNumberParam(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validateInput = Joi.object({
                id: Joi.number().integer().required()                
            })
            await validateInput.validateAsync(req.params, { abortEarly: false });
            next();
        } catch (error: unknown) {
            handlerErrorRes(error, res);
        }
    }

    async checkRoleArray(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validateInput = Joi.object({
                Role: Joi.array()
                        .items(Joi.string().valid(...RoleArray))
                        .unique()  
                        .required()              
            })

            await validateInput.validateAsync(req.body, { abortEarly: false });

            next();
        } catch (error: unknown) {
            handlerErrorRes(error, res);
        }
    }

    async checkRoleItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validateInput = Joi.object({
                Role: Joi.string()
                        .valid(...RoleArray)
                        .required()              
            })

            await validateInput.validateAsync(req.body, { abortEarly: false });

            next();
        } catch (error: unknown) {
            handlerErrorRes(error, res);
        }
    }

    async checkLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const validateInput = Joi.object({
                Email: Joi.string()
                        .email({ minDomainSegments: 2 })
                        .trim()
                        .required(),
                
                Password: Joi.string()
                            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                            .trim()
                            .required(),                
            });

            await validateInput.validateAsync(req.body, { abortEarly: false });
            
            next();
        } catch (error: unknown) {
            handlerErrorRes(error, res);
        }
    }

    //again
    async checkUrl(req: Request, res: Response, next: NextFunction){
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: 'Invalid URL',
        })
    }
}

export default new ValidateMiddleware()