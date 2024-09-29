import {StatusCodes} from 'http-status-codes'
import validateService from '../service/validate.service'

class ValidateMiddleware {
    async checkInput(req, res, next) {
        try {
            await validateService.validateAsync(req.body, { abortEarly: false });
            
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

    async checkParam(req, res, next){
        if(req.params){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: 'Invalid URL',
            })
        }
        next();
    }
}

export default new ValidateMiddleware()