import db from "../models/index.js";

const { Tree } = db;

class TreeService {
    constructor() {}

    findOne = async (conditions, attributes) =>
        Tree.findOne({
            attributes: attributes,
            where: conditions,
            include: [{ association: Tree.Seed }],
        });

    findAll = async (conditions, attributes) =>
        Tree.findAll({
            attributes: attributes,
            where: conditions,
            include: [{ association: Tree.Seed }],
        });

    create = async (data) => Tree.create(data);

    update = async (instance, data) => instance.update(data);
}

export default new TreeService();
