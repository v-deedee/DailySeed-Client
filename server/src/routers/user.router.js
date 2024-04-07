import userRole from "../constants/user.role.js";
import UserController from "../controllers/user.controller.js";

export default [
    {
        controller: UserController,
        methods: [
            // Create user
            {
                httpMethod: "post",
                path: "/user",
                method: "createUser",
                schema: {
                    type: "object",
                    properties: {
                        username: { type: "string" },
                        password: { type: "string" },
                        email: { type: "string" },
                    },
                    required: ["username", "password", "email"],
                },
            },
            // View user
            {
                httpMethod: "get",
                path: "/user",
                method: "viewUser",
                roles: [userRole.USER],
            },
            // Update profile
            {
                httpMethod: "put",
                path: "/user/profile",
                method: "updateProfile",
                roles: [userRole.USER],
                schema: {
                    type: "object",
                    properties: {
                        email: { type: "string" },
                    },
                    required: ["email"],
                },
            },
            // Update profile picture
            {
                httpMethod: "put",
                path: "/user/profile/picture",
                method: "updatePicture",
                roles: [userRole.USER],
                file: "profile_picture",
            },
        ],
    },
];
