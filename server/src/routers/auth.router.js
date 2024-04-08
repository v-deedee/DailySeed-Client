import AuthController from "../controllers/auth.controller.js";

export default [
    {
        controller: AuthController,
        methods: [
            {
                httpMethod: "post",
                path: "/auth/login",
                method: "login",
                schema: {
                    type: "object",
                    properties: {
                        username: { type: "string" },
                        password: { type: "string" },
                    },
                },
            },
        ],
    },
];
