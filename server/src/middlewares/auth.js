import jwt from "jsonwebtoken";
import errorCode from "../constants/error.code.js";
import UserService from "../services/user.service.js";

const auth = (roles) => async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer ")) {
        const token = authorization.slice("Bearer ".length);
        var secret = process.env.SECRET;
        if (token) {
            try {
                jwt.verify(token, secret, async function (err, payload) {
                    if (payload) {
                        req.payload = payload;
                        const user = await UserService.findOne({
                            username: payload.username,
                        });

                        if (
                            roles &&
                            roles.length &&
                            !roles.includes(payload.role) &&
                            !roles.includes("all") &&
                            !roles.includes("ALL")
                        ) {
                            return res.status(403).json({
                                ok: false,
                                ...errorCode.AUTH.ROLE_INVALID,
                            });
                        }

                        req.user = user;
                        if (!user || !user.active) {
                            res.status(403).json({
                                ok: false,
                                ...errorCode.AUTH.USER_DELETED,
                            });
                        }

                        next();
                    } else {
                        if (err && err.name == "TokenExpiredError") {
                            res.status(403).json({
                                ok: false,
                                ...errorCode.AUTH.TOKEN_EXPIRED,
                            });
                        } else {
                            res.status(403).json({
                                ok: false,
                                ...errorCode.AUTH.TOKEN_INVALID,
                            });
                        }
                    }
                });
            } catch (err) {
                res.status(403).json({
                    ok: false,
                    ...errorCode.AUTH.TOKEN_INVALID,
                });
            }
        } else {
            res.status(403).json({
                ok: false,
                ...errorCode.AUTH.TOKEN_INVALID,
            });
        }
    } else {
        res.status(403).json({
            ok: false,
            ...errorCode.AUTH.TOKEN_NOT_FOUND,
        });
    }
};
export default auth;
