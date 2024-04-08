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
                        habit: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                icon: { type: "string" },
                                duration: { type: "integer" },
                            },
                            required: ["name", "icon"],
                        },
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
                        required: ["habit", "criteria"],
                    },
                },
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
                schema: {
                    type: "object",
                    properties: {
                        habit: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                icon: { type: "string" },
                                duration: { type: "integer" },
                                active: { type: "boolean" },
                            },
                        },
                        criteria: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "integer" },
                                    name: { type: "string" },
                                    icon: { type: "string" },
                                    score: { type: "integer" },
                                    active: { type: "boolean" },
                                },
                                oneOf: [
                                    {
                                        allOf: [
                                            { not: { required: ["id"] } },
                                            {
                                                required: [
                                                    "name",
                                                    "icon",
                                                    "score",
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        allOf: [
                                            { required: ["id"] },
                                            {
                                                anyOf: [
                                                    { required: ["name"] },
                                                    { required: ["icon"] },
                                                    { required: ["score"] },
                                                    { required: ["active"] },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            minItems: 1,
                            maxItems: 5,
                        },
                    },
                },
            },
        ],
    },
];
