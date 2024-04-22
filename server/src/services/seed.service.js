import db from "../models/index.js";

const { Seed } = db;

class SeedService {
    constructor() {}

    findOne = async (conditions) =>
        Seed.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
        });

    create = async (data) => Seed.create(data);

    update = async (instance, data) => instance.update(data);
}

export default new SeedService();
