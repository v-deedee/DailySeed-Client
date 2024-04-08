import db from "../models/index.js";

const { Criteria } = db;

class CriteriaService {
    constructor() {}

    find = async (conditions) =>
        Criteria.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
        });

    update = async (instance, data) => instance.update(data);

    create = async (data) => Criteria.create(data);
}

export default new CriteriaService();
