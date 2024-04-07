import userRole from "../constants/user.role.js";
import UserController from "../controllers/user.controller.js";

export default [
    {
        controller: UserController,
        methods: [
            // Create new user
            {
                httpMethod: "post",
                path: "/user/create",
                method: "createUser",
                schema: {
                    type: "object",
                    properties: {
                        username: { type: "string" },
                        password: { type: "string" },
                    },
                    required: ["username", "password"],
                },
            },
            // View user profile
            {
                httpMethod: "get",
                path: "/user/profile",
                method: "viewProfile",
                roles: [userRole.USER],
            },
        ],
    },
];
