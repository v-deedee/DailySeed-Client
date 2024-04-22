import SeedService from "../services/seed.service.js";
import _ from "lodash";
import { HttpError } from "../utils/http.error.js";
import errorCode from "../constants/error.code.js";
import CloudHanlder from "../utils/cloud.handler.js";

export default class SeedController {
    constructor() {}

    createSeed = async (req, res) => {
        const { body } = req;
        const { file } = req;

        if (!file)
            throw new HttpError({
                ...errorCode.BODY_INVALID,
                message: "Asset is required",
                status: 403,
            });

        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        const picture = await CloudHanlder.upload(dataURI, "tree-asset");
        body.asset = picture.public_id;

        const seed = await SeedService.create(body);

        const payload = _.pick(seed, ["id", "name", "asset", "price"]);
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    updateSeed = async (req, res) => {
        const { params } = req;
        const { file } = req;
        const { body } = req;

        const seed = await SeedService.findOne({ id: params.id });

        if (file) {
            await CloudHanlder.remove(seed.asset);

            const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
            const picture = await CloudHanlder.upload(dataURI, "tree-asset");
            body.asset = picture.public_id;
        }

        const updatedSeed = await SeedService.update(seed, body);

        const payload = _.pick(updatedSeed, ["id", "name", "asset", "price"]);
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
