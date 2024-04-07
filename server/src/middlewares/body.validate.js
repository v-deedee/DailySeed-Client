import errorCode from "../constants/error.code.js";
import { Validator } from "jsonschema";

export default (schema) => (req, res, next) => {
    const { body } = req;

    let validator = new Validator();
    const result = validator.validate(body, schema);
    if (result.errors.length) {
        return res.status(400).json({
            ok: false,
            ...errorCode.BODY_INVALID,
            message: result.errors.map((x) => x.message).join(", "),
        });
    }

    next();
};
