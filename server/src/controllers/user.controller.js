import errorCode from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import UserService from "../services/user.service.js";
import ProfileService from "../services/profile.service.js";
import SeedService from "../services/seed.service.js";
import userRole from "../constants/user.role.js";
import bcrypt from "bcrypt";
import CloudHanlder from "../utils/cloud.handler.js";
import _ from "lodash";

export default class UserController {
    constructor() {}

    viewUser = async (req, res) => {
        const { user } = req;

        const profile = await ProfileService.findOne({ UserId: user.id });

        const payload = {
            user: _.pick(user, ["id", "username"]),
            profile: _.pick(profile, ["id", "email", "picture", "money"]),
        };
        res.status(200).json({
            ok: true,
            data: payload,
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
        body.Profile = {
            email: body.email,
        };

        const user = await UserService.create(body);

        const seed = await SeedService.findOne({ name: "default" });
        await user.addSeed(seed);

        const payload = {
            user: _.pick(user, ["id", "username"]),
            profile: _.pick(user.Profile, ["id", "email", "picture", "money"]),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    updateProfile = async (req, res) => {
        const { user } = req;
        const { body } = req;
        const { file } = req;

        const profile = await ProfileService.findOne({ UserId: user.id });

        if (file) {
            // Remove old picture
            await CloudHanlder.remove(profile.picture);

            // Encoding picture
            const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
            const picture = await CloudHanlder.upload(
                dataURI,
                "profile-picture"
            );

            body.picture = picture.public_id;
        }

        const updatedProfile = await ProfileService.update(profile, body);

        const payload = {
            profile: _.pick(updatedProfile, [
                "id",
                "email",
                "picture",
                "money",
            ]),
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    updatePassword = async (req, res) => {
        const { body } = req;
        const { user } = req;

        if (!bcrypt.compareSync(body.password, user.password))
            throw new HttpError({
                ...errorCode.AUTH.PASSWORD_INVALID,
                status: 400,
            });

        const data = {
            password: bcrypt.hashSync(
                body.newPassword,
                bcrypt.genSaltSync(12),
                null
            ),
        };
        const updatedUser = await UserService.update(user, data);

        const payload = {
            user: _.pick(updatedUser, ["id", "username", "updatedAt"]),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
