import db from "../models/index.js";

const { User } = db;

class UserService {
    constructor() {}

    findOne = async (conditions) =>
        User.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
            include: [{ association: User.Profile }],
        });

    create = async (data) =>
        User.create(data, {
            include: [{ association: User.Profile }],
        });

    update = async (instance, data) => instance.update(data);
}

export default new UserService();
