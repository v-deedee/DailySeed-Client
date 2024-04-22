import db from "../models/index.js";

const { Profile } = db;

class ProfileService {
    constructor() {}

    findOne = async (conditions) =>
        Profile.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
        });

    update = async (instance, data) => instance.update(data);
}

export default new ProfileService();
