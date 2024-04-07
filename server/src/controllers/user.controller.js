import error from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import UserService from "../services/user.service.js";
import ProfileService from "../services/profile.service.js";
import userRole from "../constants/user.role.js";
import bcrypt from "bcrypt";

export default class UserController {
    constructor() {}

    viewProfile = async (req, res) => {
        const { user } = req;

        const profile = await ProfileService.find({ UserId: user.id });

        res.status(200).json({
            ok: true,
            data: {
                profile: profile,
            },
        });
    };

    createUser = async (req, res) => {
        const { body } = req;
        body.role = userRole.USER;
        body.password = bcrypt.hashSync(
            body.password,
            bcrypt.genSaltSync(12),
            null
        );
        body.Profile = {};

        const user = await UserService.create(body);

        const payload = {
            id: user.id,
            username: user.username,
            profile: {
                id: user.Profile.id,
                money: user.Profile.money,
                picture: user.Profile.picture,
            },
        }
        res.status(200).json({
            ok: true,
            data: {
                user: payload,
            },
        });
    };
}
