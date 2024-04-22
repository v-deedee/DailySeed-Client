import Joi from "joi";

export default {
    create: Joi.object({
        email: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
    updateProfile: Joi.object({
        email: Joi.string(),
    }),
    udpatePassword: Joi.object({
        password: Joi.string().required(),
        newPassword: Joi.string().required(),
    }),
};
