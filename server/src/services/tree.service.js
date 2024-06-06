import db from "../models/index.js";

const { Tree } = db;

class TreeService {
    constructor() { }

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
            order: [['date', 'ASC']]
        });

    create = async (data) => Tree.create(data);

    update = async (instance, data) => instance.update(data);

    countTree = async (conditions) =>
        Tree.count({
            where: conditions,
        });
}

export default new TreeService();
