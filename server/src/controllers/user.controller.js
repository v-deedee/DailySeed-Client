import errorCode from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import UserService from "../services/user.service.js";
import ProfileService from "../services/profile.service.js";
import SeedService from "../services/seed.service.js";
import userRole from "../constants/user.role.js";
import bcrypt from "bcrypt";
import CloudHanlder from "../utils/cloud.handler.js";
import _ from "lodash";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51P7bjf05CJZ8qs7kDcGSebDhXZPJ7VpPLceToyYQ7PQzfzYrwZqI8wuvfqBNDZeZ8wwlW07NFRO1CGza2softbc500Fz4T8jv6'); // Replace with your Stripe secret key


export default class UserController {
    constructor() {}

    #removeProfilePic = async (picture) => {
        await CloudHanlder.remove(picture);
    };

    #uploadProfilePic = async (picture, folder) => {
        const b64 = Buffer.from(picture.buffer).toString("base64");
        let dataURI = "data:" + picture.mimetype + ";base64," + b64;
        const uploadedPicture = await CloudHanlder.upload(
            dataURI,
            folder,
            picture.originalname
        );

        return uploadedPicture.public_id;
    };

    viewUser = async (req, res) => {
        const { user } = req;

        const profile = await ProfileService.findOne({ UserId: user.id });

        const payload = {
            user: _.pick(user, ["id", "username"]),
            profile: _.pick(profile, ["id", "email", "picture", "money"]),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    createUser = async (req, res) => {
        const { body } = req;
        body.role = userRole.USER;
        body.password = bcrypt.hashSync(
            body.password,
            bcrypt.genSaltSync(12),
            null
        );
        body.Profile = {
            email: body.email,
        };

        const user = await UserService.create(body);

        const seed = await SeedService.findOne({ price: 0 });
        await user.addSeed(seed);

        const payload = {
            user: _.pick(user, ["id", "username"]),
            profile: _.pick(user.Profile, ["id", "email", "picture", "money"]),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    updateProfile = async (req, res) => {
        const { user } = req;
        const { body } = req;
        const { files } = req;

        const profile = await ProfileService.findOne({ UserId: user.id });

        if (files["profile"]) {
            await this.#removeProfilePic(profile.picture);
            body.picture = await this.#uploadProfilePic(
                files["picture"],
                "profile-picture"
            );
        }

        const updatedProfile = await ProfileService.update(profile, body);

        const payload = {
            profile: _.pick(updatedProfile, [
                "id",
                "email",
                "picture",
                "money",
            ]),
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    updatePassword = async (req, res) => {
        const { body } = req;
        const { user } = req;

        if (!bcrypt.compareSync(body.password, user.password))
            throw new HttpError({
                ...errorCode.AUTH.PASSWORD_INVALID,
                status: 400,
            });

        const data = {
            password: bcrypt.hashSync(
                body.newPassword,
                bcrypt.genSaltSync(12),
                null
            ),
        };
        const updatedUser = await UserService.update(user, data);

        const payload = {
            user: _.pick(updatedUser, ["id", "username", "updatedAt"]),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };


    createPaymentIntent = async (req, res) => {
        const { amount } = req.body;
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'vnd',
                payment_method_types: ['card'],
            });
    
            res.status(200).send({
                ok: true,
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    
    }


    handlePaymentSuccess = async (req, res) => {
        const { user } = req;
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            throw new HttpError({
                ...errorCode.BAD_REQUEST,
                message: "Invalid amount",
            });
        }

        const intAmount = parseInt(amount, 10);

        const profile = await ProfileService.findOne({ UserId: user.id });
        const updatedProfile = await ProfileService.update(profile, {
            money: profile.money + intAmount,
        });

        const payload = {
            profile: _.pick(updatedProfile, ["id", "email", "picture", "money"]),
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

}
