import AuthController from "../controllers/auth.controller.js";

export default [
    {
        controller: AuthController,
        methods: [
            {
                httpMethod: "post",
                path: "/auth/login",
                method: "login",
            },
        ],
    },
];
