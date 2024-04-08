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

    update = async (instance, data) => instance.update(data);
}

export default new UserService();
