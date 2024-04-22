import db from "../models/index.js";

const { Tree } = db;

class TreeService {
    constructor() {}

    findOne = async (conditions, attributes) =>
        Tree.findOne({
            attributes: attributes,
            where: conditions,
        });

    findAll = async (conditions, attributes) =>
        Tree.findAll({
            attributes: attributes,
            where: conditions,
        });

    create = async (data) => Tree.create(data);
}

export default new TreeService();
