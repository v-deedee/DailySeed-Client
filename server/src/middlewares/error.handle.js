import { BaseError, ValidationError } from "sequelize";
import errorCode from "../constants/error.code.js";

export default (err, req, res, next) => {
    console.log(err);

    if (err instanceof ValidationError) {
        err.message = err.errors[0].message;
    }

    res.status(err.status || 500).json({
        ok: false,
        code: err.code || errorCode.INTERNAL_SERVER_ERROR.code,
        message: err.message || errorCode.INTERNAL_SERVER_ERROR.message,
    });
};
