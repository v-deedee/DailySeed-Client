import Joi from "joi";

export default {
    create: Joi.object({
        habit: Joi.object({
            name: Joi.string().required(),
            icon: Joi.string().required(),
            duration: Joi.number().integer().positive(),
        }).required(),
        criteria: Joi.array()
            .items(
                Joi.object({
                    name: Joi.string().required(),
                    icon: Joi.string().required(),
                    score: Joi.number().integer().min(0).max(100).required(),
                })
            )
            .min(2)
            .max(5)
            .required(),
    }),

    update: Joi.object({
        habit: Joi.object({
            name: Joi.string(),
            icon: Joi.string(),
            duration: Joi.number().integer().positive(),
            active: Joi.boolean(),
        }).or("name", "icon", "duration", "active"),
        criteria: Joi.array()
            .items(
                Joi.object({
                    id: Joi.number().integer(),
                    name: Joi.string().when("id", {
                        is: Joi.exist(),
                        then: Joi.optional(),
                        otherwise: Joi.required(),
                    }),
                    icon: Joi.string().when("id", {
                        is: Joi.exist(),
                        then: Joi.optional(),
                        otherwise: Joi.required(),
                    }),
                    score: Joi.number().integer().min(0).max(100).when("id", {
                        is: Joi.exist(),
                        then: Joi.optional(),
                        otherwise: Joi.required(),
                    }),
                    active: Joi.boolean().when("id", {
                        is: Joi.exist(),
                        then: Joi.optional(),
                        otherwise: Joi.forbidden(),
                    }),
                }).required()
            )
            .min(1)
            .max(10),
    }).or("habit", "criteria"),

    track: Joi.object({
        criteria: Joi.array()
            .items(
                Joi.object({
                    id: Joi.number().integer().required(),
                    score: Joi.number().integer().required(),
                }).required()
            )
            .min(1)
            .required(),
    }).required(),
};
