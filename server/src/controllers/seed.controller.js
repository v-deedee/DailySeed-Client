import SeedService from "../services/seed.service.js";
import _ from "lodash";
import { HttpError } from "../utils/http.error.js";
import errorCode from "../constants/error.code.js";

export default class SeedController {
    constructor() {}

    createSeed = async (req, res) => {
        const { body } = req;

        body.asset = "tmp";
        const seed = await SeedService.create(body);

        const payload = _.pick(seed, ["id", "name", "asset", "price"]);
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
