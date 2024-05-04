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
                file: "asset",
            },
            {
                httpMethod: "put",
                path: "/seed/:id",
                method: "updateSeed",
                roles: [userRole.ADMIN],
                schema: seedSchema.update,
                file: "asset",
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
                roles: [userRole.USER]
            }
        ],
    },
];
