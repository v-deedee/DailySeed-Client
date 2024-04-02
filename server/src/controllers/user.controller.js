import error from "../constants/error.code";
import User from "../models/user";
import { HttpError } from "../utils/http.error";

export default class UserController {
    constructor() {}
    create = async (req, res) => {
        const data = {
            username: "onyzabao",
            password: "onlyzabao",
        };

        const user = await User.create(data);

        res.status(200).json({
            user: user,
        });
    };
}
