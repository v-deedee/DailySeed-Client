import SeedService from "../services/seed.service.js";
import _ from "lodash";
import { HttpError } from "../utils/http.error.js";
import errorCode from "../constants/error.code.js";
import CloudHanlder from "../utils/cloud.handler.js";
import userRole from "../constants/user.role.js";

export default class SeedController {
    constructor() {}

    #uploadAssets = async (assets, folder) => {
        let URLs = [];
        for (const asset of assets) {
            const b64 = Buffer.from(asset.buffer).toString("base64");
            let dataURI = "data:" + asset.mimetype + ";base64," + b64;
            const picture = await CloudHanlder.upload(
                dataURI,
                folder,
                asset.originalname
            );
            URLs.push(picture.public_id);
        }
        return URLs.join("|");
    };

    #removeAssets = async (assets) => {
        for (const asset in assets) {
            await CloudHanlder.remove(asset);
        }
    };

    createSeed = async (req, res) => {
        const { body } = req;
        const { files } = req;

        if (!files["assets"])
            throw new HttpError({
                ...errorCode.BODY_INVALID,
                message: "Assets is required",
                status: 403,
            });

        body.asset = await this.#uploadAssets(
            files["assets"],
            `seeds/${body.name}`
        );

        const seed = await SeedService.create(body);

        const payload = _.pick(seed, ["id", "name", "asset", "price"]);
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    updateSeed = async (req, res) => {
        const { params } = req;
        const { files } = req;
        const { body } = req;

        const seed = await SeedService.findOne({ id: params.id });

        console.log(files);
        if (files["assets"]) {
            await this.#removeAssets(seed.asset.split("|"));
            body.asset = await this.#uploadAssets(
                files["assets"],
                `seeds/${seed.name}`
            );
        }

        const updatedSeed = await SeedService.update(seed, body);

        const payload = _.pick(updatedSeed, ["id", "name", "asset", "price"]);
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    listSeed = async (req, res) => {
        const { user } = req;

        let seeds;
        if (user.role == userRole.USER) {
            seeds = await user.getSeeds();
        } else {
            seeds = await SeedService.findAll();
        }

        const payload = _.map(seeds, (seed) =>
            _.pick(seed, ["id", "name", "asset", "price"])
        );
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    viewUserSeeds = async (req, res) => {
        const { user } = req;

        if (user.role !== userRole.USER) {
            throw new HttpError({
                ...errorCode.AUTH.ROLE_INVALID,
                status: 403,
            });
        }

        const seeds = await SeedService.findAll({ UserId: user.id });

        const payload = seeds.map((seed) =>
            _.pick(seed, ["id", "name", "asset", "price"])
        );

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
