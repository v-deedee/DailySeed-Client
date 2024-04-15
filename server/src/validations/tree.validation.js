import Joi from "joi";

export default {
    create: Joi.object({
        seedId: Joi.number().integer().min(0).required(),
    }).required(),
};
