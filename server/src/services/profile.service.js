import db from "../models/index.js";

const { Profile } = db;

class ProfileService {
    constructor() {}

    find = async (conditions) =>
        Profile.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
        });
}

export default new ProfileService();
