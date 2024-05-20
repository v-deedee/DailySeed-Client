import Joi from "joi";

export default {
    create: Joi.object({
        seedId: Joi.number().integer().min(0).required(),
    }).required(),

    update: Joi.object({
        trees: Joi.array()
            .items(
                Joi.object({
                    id: Joi.number().integer().required(),
                    coordinate_x: Joi.number().integer().allow(null).required(),
                    coordinate_y: Joi.number().integer().allow(null).required(),
                }).required()
            )
            .min(1)
            .required(),
    }).required(),
};
