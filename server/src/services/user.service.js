import db from "../models/index.js";

const { User } = db;

class UserService {
    constructor() {}

    find = async (conditions) =>
        User.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
        });

    create = async (data) =>
        User.create(data, {
            include: [{ association: User.Profile }],
        });

    view = async (conditions) =>
        User.findOne({
            attributes: ["username"],
            where: conditions,
            include: [
                { association: User.Profile, attributes: ["money", "picture"] },
            ],
        });
}

export default new UserService();
