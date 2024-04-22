import userRole from "../constants/user.role.js";
import HabitController from "../controllers/habit.controller.js";
import habitSchema from "../validations/habit.validation.js";

export default [
    {
        controller: HabitController,
        methods: [
            // Create Habit
            {
                httpMethod: "post",
                path: "/habit",
                method: "createHabit",
                roles: [userRole.USER],
                schema: habitSchema.create,
            },
            // View habit
            {
                httpMethod: "get",
                path: "/habit/:id",
                method: "viewHabit",
                roles: [userRole.USER],
            },
            // Update habit
            {
                httpMethod: "put",
                path: "/habit/:id",
                method: "updateHabit",
                roles: [userRole.USER],
                schema: habitSchema.update,
            },
            // list habit
            {
                httpMethod: "get",
                path: "/habit/tracking/:treeId",
                method: "listTrackingHabit",
                roles: [userRole.USER],
            },
            {
                httpMethod: "post",
                path: "/habit/tracking/:treeId",
                method: "trackHabit",
                roles: [userRole.USER],
                schema: habitSchema.track,
            },
        ],
    },
];
