import SeedService from "../services/seed.service.js";
import _ from "lodash";
import { HttpError } from "../utils/http.error.js";
import errorCode from "../constants/error.code.js";
import CloudHanlder from "../utils/cloud.handler.js";
import userRole from "../constants/user.role.js";
import ProfileService from "../services/profile.service.js";


export default class SeedController {
    constructor() {}

    #uploadAssets = async (assets, folder) => {
        let URLs = [];
        for (const asset of assets) {
            console.log(asset);
            const b64 = Buffer.from(asset.buffer).toString("base64");
            let dataURI = "data:" + asset.mimetype + ";base64," + b64;
            const picture = await CloudHanlder.upload(
                dataURI,
                folder,
                asset.originalname.replace(/\.[^/.]+$/, "")
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

    listUserSeed = async (req, res) => {
        const { user } = req;

        const seeds = await user.getSeeds();

        const payload = _.map(seeds, (seed) => _.pick(seed, ["id", "asset"]));
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    listShopSeed = async (req, res) => {
        const { user } = req;

        const ownedSeeds = new Set(_.map(await user.getSeeds(), "id"));

        const seeds = await SeedService.findAll();

        const payload = _.map(seeds, (seed) => {
            const seedData = _.pick(seed, ["id", "name", "asset", "price"]);
            seedData.owned = ownedSeeds.has(seedData.id);
            return seedData;
        });
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    buySeed = async (req, res) => {
        const { body } = req;
        const { user } = req;

        const seed = await SeedService.findOne({ id: body.id });
        if (!seed)
            throw new HttpError({ ...errorCode.SEED.NOT_FOUND, status: 403 });

        if (seed.price > user.Profile.money)
            throw new HttpError({
                ...errorCode.SEED.NOT_ENOUGH_MONEY,
                status: 403,
            });

        const profile = await ProfileService.findOne({ UserId: user.id });

        await ProfileService.update(profile, {
            money: profile.money - seed.price,
        });     

        await user.addSeed(seed);

        res.status(200).json({
            ok: true,
            data: null,
        });
    };
}
