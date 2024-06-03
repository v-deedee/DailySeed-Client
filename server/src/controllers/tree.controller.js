import SeedService from "../services/seed.service.js";
import TreeService from "../services/tree.service.js";
import { HttpError } from "../utils/http.error.js";
import errorCode from "../constants/error.code.js";
import { Op } from "sequelize";
import _ from "lodash";
import habitService from "../services/habit.service.js";
import CloudHanlder from "../utils/cloud.handler.js";


export default class TreeController {
    constructor() { }

    #removePicture = async (picture) => {
        if(picture) {
            const [public_id, extension] = picture.split(".");
            await CloudHanlder.remove(public_id);
        }
    };

    #uploadPicture = async (picture, folder, id) => {
        const b64 = Buffer.from(picture.buffer).toString("base64");
        let dataURI = "data:" + picture.mimetype + ";base64," + b64;
        const uploadedPicture = await CloudHanlder.upload(
            dataURI,
            folder,
            id 
        );
        const fileExt = picture.originalname.split('.').pop();

        return uploadedPicture.public_id + "." + fileExt;
    };

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

        const selectedCriteria = _.keyBy(await tree.getCriteria(), "HabitId");
        const habits = await habitService.findAll({
            id: Object.keys(selectedCriteria),
        });

        const payload = {
            tree: _.pick(tree, ["id", "date", "score", "note", "picture"]),
            seed: {
                ..._.pick(tree.Seed, ["id", "name", "asset"]),
                phase: tree.getPhase(),
            },
            habits: _.map(habits, (habit) => {
                const habitData = _.pick(habit, ["id", "name", "icon"]);
                habitData.selected = _.pick(selectedCriteria[habit.id], ["id", "name", "icon", "score"]);
                return habitData;
            }),
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    #getDateQuery = (query) => {
        const { day, month, year } = query;

        if (year && month && day) {
            const date = `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`;
            return date;
        }

        if (year && month) {
            const start = `${year}${month.padStart(2, "0")}01`;
            const end = `${year}${month.padStart(2, "0")}${new Date(year, month, 0)
                .getDate()
                .toString()
                .padStart(2, "0")}`;
            return { [Op.between]: [start, end] };
        }

        if (year) {
            const start = `${year}0101`;
            const end = `${year}1231`;
            return { [Op.between]: [start, end] };
        }

        return null;
    };

    findTree = async (req, res) => {
        const { user } = req;
        const { params } = req;

        const filter = { UserId: user.id };
        const dateFilter = this.#getDateQuery(params);
        if (dateFilter) filter.date = dateFilter;
        const tree = await TreeService.findOne(filter);
        if (!tree)
            throw new HttpError({ ...errorCode.TREE.NOT_FOUND, status: 403 });

        const payload = {
            tree: _.pick(tree, ["id", "date", "score", "note", "picture"]),
            seed: {
                ..._.pick(tree.Seed, ["id", "asset"]),
                phase: tree.getPhase(),
            },
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
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
        const seedSelectFields = ["id", "asset", "name"];
        if (query.extend) {
            treeSelectFields.push(...["date", "note", "picture"]);
            seedSelectFields.push(...["name"]);
        }

        let garden = [];
        let inventory = {};
        let chart = { 'date': [], 'data': [] };

        for (const tree of trees) {
            if (new Date(tree.date).getDate() == new Date().getDate()) {
                continue
            }

            chart['date'].push(tree.date)
            chart['data'].push(tree.score)

            const phase = tree.getPhase();
            if (tree.isPlanted()) {
                garden.push({
                    tree: _.pick(tree, treeSelectFields),
                    seed: {
                        ..._.pick(tree.Seed, seedSelectFields),
                        phase: phase,
                    },
                });
            } else {
                inventory[tree.Seed.name] ??= { phase: {}, asset: tree.Seed.asset };
                inventory[tree.Seed.name].phase[phase] ??= [];
                inventory[tree.Seed.name].phase[phase].push(tree.id);
            }
        }

        const payload = {
            garden: garden,
            inventory: inventory,
            chart: chart,
        };

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

        res.status(200).json({
            ok: true,
        });
    };

    updateNote = async (req, res) => {
        console.log(req)
        const { params } = req;
        const { files } = req;
        const { body } = req;

        const tree = await TreeService.findOne({ id: params.id });

        if (files["picture"]) {
            await this.#removePicture(tree.picture);
            body.picture = await this.#uploadPicture(
                files["picture"][0],
                `trees`,
                tree.id
            );
        }

        const updateTree = await TreeService.update(tree, body);

        const payload = {
            tree: _.pick(updateTree, ["id", "date", "score", "note", "picture"]),
            seed: {
                ..._.pick(updateTree.Seed, ["id", "asset"]),
                phase: updateTree.getPhase(),
            },
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
