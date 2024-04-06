import UserController from "../controllers/user.controller.js";

export default [
    {
        controller: UserController,
        methods: [
            {
                httpMethod: "post",
                path: "/user/create",
                method: "create",
            },
        ],
    },
];
