import SeedService from "../services/seed.service.js";
import _ from "lodash";
import TreeService from "../services/tree.service.js";
import { HttpError } from "../utils/http.error.js";
import errorCode from "../constants/error.code.js";

export default class TreeController {
    constructor() {}

    createTree = async (req, res) => {
        const { user } = req;
        const { body } = req;

        const seed = await SeedService.findOne({ id: body.seedId });
        if (!seed)
            throw new HttpError({
                ...errorCode.SEED.NOT_FOUND,
                status: 400,
            });

        delete body.seedId;
        body.SeedId = seed.id;
        body.UserId = user.id;
        body.date = new Date();

        const tree = await TreeService.create(body);

        const payload = {
            tree: _.pick(tree, ["id", "date", "score"]),
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

        const payload = {
            tree: _.pick(tree, ["id", "date", "score", "note", "picture"]),
            seed: _.pick(tree.Seed, ["id", "name", "asset"]),
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
