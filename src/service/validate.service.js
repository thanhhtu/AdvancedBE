import Joi from 'joi'

const validateService = Joi.object({
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

export default validateService;