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
            },
        ],
    },
];
