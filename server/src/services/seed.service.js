import db from "../models/index.js";

const { Seed } = db;

class SeedService {
    constructor() {}

    find = async (conditions) =>
        Seed.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
        });

    create = async (data) => Seed.create(data);
}

export default new SeedService();
