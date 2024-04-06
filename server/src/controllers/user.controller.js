import error from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import UserService from "../services/user.service.js";

export default class UserController {
    constructor() {}
    create = async (req, res) => {
        const data = {
            username: "onyzabao2err",
            password: "onlyzabao",
            role: "admin",
        };

        const user = await UserService.create(data);

        res.status(200).json({
            user: user,
        });
    };
}
