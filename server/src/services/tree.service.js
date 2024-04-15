import db from "../models/index.js";

const { Tree } = db;

class TreeService {
    constructor() {}

    find = async (conditions) =>
        Tree.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
        });

    create = async (data) => Tree.create(data);
}

export default new TreeService();
