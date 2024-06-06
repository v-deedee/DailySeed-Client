import userRole from "../constants/user.role.js";
import UserController from "../controllers/user.controller.js";
import userValidation from "../validations/user.validation.js";

export default [
    {
        controller: UserController,
        methods: [
            // Create user
            {
                httpMethod: "post",
                path: "/user",
                method: "createUser",
                schema: userValidation.create,
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
                schema: userValidation.updateProfile,
                files: [{ name: "picture", maxCount: 1 }],
            },
            // Update password
            {
                httpMethod: "put",
                path: "/user/password",
                method: "updatePassword",
                roles: [userRole.USER],
                schema: userValidation.udpatePassword,
            },
            {
                httpMethod: "post",
                path: "/user/create-payment-intent",
                method: "createPaymentIntent",
                roles: [userRole.USER],
            },
            {
                httpMethod: "post",
                path: "/user/handle-payment-success",
                method: "handlePaymentSuccess",
                roles: [userRole.USER]
            },
            {
                httpMethod: "get",
                path: "/user/statistic",
                method: "statistic",
                roles: [userRole.USER]
            },
        ],
    },
];
