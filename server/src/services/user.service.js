import db from "../models/index.js";

const { User, Profile } = db;

class UserService {
    constructor() {}
    create = async (data) =>
        User.create(data, {
            include: [{ association: User.Profile }],
        });
}

export default new UserService();
