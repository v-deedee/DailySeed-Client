import AuthController from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";

export default [
    {
        controller: AuthController,
        methods: [
            {
                httpMethod: "post",
                path: "/auth/login",
                method: "login",
                schema: authValidation.login,
            },
        ],
    },
];
