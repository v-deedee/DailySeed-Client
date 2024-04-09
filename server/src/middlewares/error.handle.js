import { ValidationError } from "sequelize";
import errorCode from "../constants/error.code.js";

export default (err, req, res, next) => {
    console.log("-".repeat(35));
    console.log(err);
    console.log("-".repeat(35));

    if (err instanceof ValidationError) {
        err.status = 400;
        err.code = errorCode.BODY_INVALID.code;
        err.message = err.errors[0].message;
    }

    res.status(err.status || 500).json({
        ok: false,
        code: err.code || errorCode.INTERNAL_SERVER_ERROR.code,
        message: err.message || errorCode.INTERNAL_SERVER_ERROR.message,
    });
};
