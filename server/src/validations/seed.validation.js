import Joi from "joi";

export default {
    create: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().integer().min(0).required(),
        // asset:        
    }).required(),
};
