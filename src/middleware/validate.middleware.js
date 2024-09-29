import {StatusCodes} from 'http-status-codes'
import Joi from 'joi'

class ValidateMiddleware {
    async checkInput(req, res, next) {
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
                
                Role: Joi.string()
                        .valid('admin', 'user')
                        .trim()
                        .required(),
                
            })
            .with('Password', 'RepeatPassword');

            await validateInput.validateAsync(req.body, { abortEarly: false });
            
            req.body.Gender = (req.body.Gender === "woman" ? 1 : 0);
            req.body.Role = (req.body.Role === "admin" ? 0 : 1);

            next();
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: (new Error(error)).message,
            });
        }
    }

    async checkLogin(req, res, next) {
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
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: (new Error(error)).message,
            });
        }
    }

    //again
    async checkUrl(req, res, next){
        if(true){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: 'Invalid URL',
            })
        }
    }
}

export default new ValidateMiddleware()