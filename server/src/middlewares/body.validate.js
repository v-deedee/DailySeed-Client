import errorCode from "../constants/error.code.js";

export default (schema) => (req, res, next) => {
    const { body } = req;

    const { error } = schema.validate(body);
    if (error) {
        return res.status(400).json({
            ok: false,
            ...errorCode.BODY_INVALID,
            message: error.details.map((detail) => detail.message.replaceAll("\"", "")).join(", "),
        });
    }

    next();
};
