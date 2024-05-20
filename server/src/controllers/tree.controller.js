import SeedService from "../services/seed.service.js";
import TreeService from "../services/tree.service.js";
import { HttpError } from "../utils/http.error.js";
import errorCode from "../constants/error.code.js";
import { Op } from "sequelize";
import _ from "lodash";

export default class TreeController {
    constructor() { }

    createTree = async (req, res) => {
        const { user } = req;
        const { body } = req;

        const seed = await SeedService.findOne({ id: body.seedId });
        if (!seed)
            throw new HttpError({
                ...errorCode.SEED.NOT_FOUND,
                status: 400,
            });

        let tree = await TreeService.findOne({
            UserId: user.id,
            date: new Date(),
        });
        if (tree != null)
            throw new HttpError({
                ...errorCode.TREE.ALREADY_CREATED,
                status: 403,
            });

        delete body.seedId;
        body.SeedId = seed.id;
        body.UserId = user.id;
        body.date = new Date();

        tree = await TreeService.create(body);

        const payload = {
            tree: _.pick(tree, ["id", "date", "score", "note", "picture"]),
            seed: _.pick(seed, ["id", "name", "asset"]),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    viewTree = async (req, res) => {
        const { user } = req;
        const { params } = req;

        const tree = await TreeService.findOne({ id: params.id });
        if (!tree)
            throw new HttpError({ ...errorCode.TREE.NOT_FOUND, status: 403 });
        if (tree.UserId != user.id)
            throw new HttpError({
                ...errorCode.AUTH.ROLE_INVALID,
                status: 403,
            });

        const phase = tree.score < 25 ? 1 : tree.score < 50 ? 2 : tree.score < 75 ? 3 : 4;

        const payload = {
            tree: _.pick(tree, ["id", "date", "score", "note", "picture"]),
            seed: {
                ..._.pick(tree.Seed, ["id", "name", "asset"]),
                phase: phase
            }
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    #getDateQuery = (query) => {
        let rangePattern = /\[\d{8},\d{8}\]/;
        let pointPattern = /\d{8}/;

        if (rangePattern.test(query.date)) {
            const [start, end] = query.date
                .substring(1, query.date.length - 1)
                .split(",");

            return { [Op.between]: [start, end] };
        }

        if (pointPattern.test(query.date)) {
            return query.date;
        }

        return null;
    };

    listTree = async (req, res) => {
        const { user } = req;
        const { query } = req;

        const filter = { UserId: user.id };
        const dateFilter = this.#getDateQuery(query);
        if (dateFilter) filter.date = dateFilter;

        const trees = await TreeService.findAll(filter);

        const treeSelectFields = [
            "id",
            "coordinate_x",
            "coordinate_y",
            "score",
        ];
        const seedSelectFields = ["id", "asset"];
        if (query.extend) {
            treeSelectFields.push(...["date", "note", "picture"]);
            seedSelectFields.push(...["name"]);
        }
        // const payload = _.map(trees, (tree) => ({
        //     tree: _.pick(tree, treeSelectFields),
        //     seed: _.pick(tree.Seed, seedSelectFields),
        // }));
        const payload = _.map(trees, (tree) => {
            const treeData = _.pick(tree, treeSelectFields);
            const seedData = _.pick(tree.Seed, seedSelectFields);

            const score = treeData.score;
            const phase = score < 25 ? 1 : score < 50 ? 2 : score < 75 ? 3 : 4;
            seedData.phase = phase;

            return {
                tree: treeData,
                seed: seedData,
            };
        });

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    updateTree = async (req, res) => {
        const { body } = req;
        const { user } = req;

        for (const tree of body.trees) {
            const targetTree = await TreeService.findOne({ id: tree.id });
            if (!targetTree)
                throw new HttpError({
                    ...errorCode.TREE.NOT_FOUND,
                    status: 403,
                });

            if (targetTree.UserId != user.id)
                throw new HttpError({
                    ...errorCode.AUTH.ROLE_INVALID,
                    status: 403,
                });

            targetTree.coordinate_x = tree.coordinate_x;
            targetTree.coordinate_y = tree.coordinate_y;
            await targetTree.save();
        }

        const payload = null;
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
