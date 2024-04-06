import error from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import UserService from "../services/user.service.js";

export default class UserController {
    constructor() {}
    create = async (req, res) => {
        const data = {
            username: "onyzabao1",
            password: "onlyzabao",
            role: "admin",
            Profile: {
                money: 100,
            },
        };

        const user = await UserService.create(data);

        res.status(200).json({
            user: user,
        });
    };
}
