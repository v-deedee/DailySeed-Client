import error from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";

export default class AuthController {
    constructor() {}
    login = async (req, res) => {
        const { body } = req;

        const user = await UserService.find({ username: body.username });
        if (!user || !user.active)
            throw new HttpError({ ...error.AUTH.USER_NOT_FOUND, status: 400 });
        if (!bcrypt.compareSync(body.password, user.password))
            throw new HttpError({
                ...error.AUTH.PASSWORD_INVALID,
                status: 400,
            });

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "30d",
        });

        res.status(200).json({
            ok: true,
            data: {
                token: `Bearer ${token}`,
                payload: payload,
            },
        });
    };
}
