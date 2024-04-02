import UserController from "../controllers/user.controller";

export default [
    {
        controller: UserController,
        methods: [
            {
                httpMethod: "get",
                path: "/user/create",
                method: "create",
            },
        ],
    },
];
