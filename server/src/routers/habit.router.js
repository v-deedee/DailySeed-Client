import userRole from "../constants/user.role.js";
import HabitController from "../controllers/habit.controller.js";

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
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        icon: { type: "string" },
                        criteria: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    icon: { type: "string" },
                                    score: { type: "integer" },
                                },
                                required: ["name", "icon", "score"],
                            },
                            minItems: 2,
                            maxItems: 5,
                        },
                        required: ["name", "icon", "criteria"],
                    },
                },
            },
        ],
    },
];
