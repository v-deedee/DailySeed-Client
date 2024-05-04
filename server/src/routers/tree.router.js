import userRole from "../constants/user.role.js";
import TreeController from "../controllers/tree.controller.js";
import treeSchema from "../validations/tree.validation.js";

export default [
    {
        controller: TreeController,
        methods: [
            {
                httpMethod: "post",
                path: "/tree",
                method: "createTree",
                roles: [userRole.USER],
                schema: treeSchema.create,
            },
            {
                httpMethod: "get",
                path: "/tree/:id",
                method: "viewTree",
                roles: [userRole.USER],
            },
            {
                httpMethod: "get",
                path: "/tree/all",
                method: "viewUserTree",
                roles: [userRole.USER],
            }
        ],
    },
];
