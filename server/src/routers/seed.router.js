import userRole from "../constants/user.role.js";
import SeedController from "../controllers/seed.controller.js";
import seedSchema from "../validations/seed.validation.js";

export default [
    {
        controller: SeedController,
        methods: [
            {
                httpMethod: "post",
                path: "/seed",
                method: "createSeed",
                roles: [userRole.ADMIN],
                schema: seedSchema.create,
                files: [{ name: "assets", maxCount: 4 }],
            },
            {
                httpMethod: "put",
                path: "/seed/:id",
                method: "updateSeed",
                roles: [userRole.ADMIN],
                schema: seedSchema.update,
                files: [{ name: "assets", maxCount: 4 }],
            },
            {
                httpMethod: "get",
                path: "/seed",
                method: "listSeed",
                roles: [userRole.USER, userRole.ADMIN],
            },
            {
                httpMethod: "get",
                path: "/seed/all",
                method: "viewUserSeed",
                roles: [userRole.USER],
            },
            {
                httpMethod: "post",
                path: "/seed/buy",
                method: "buySeed",
                roles: [userRole.USER],
                schema: seedSchema.buy,
            },
        ],
    },
];
