import error from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import HabitService from "../services/habit.service.js";
import _ from "lodash";

export default class HabitController {
    constructor() {}

    createHabit = async (req, res) => {
        const { body } = req;
        const { user } = req;
        body.UserId = user.id;
        // Handle association create
        body.Criteria = body.criteria;
        delete body.criteria;

        const habit = await HabitService.create(body);

        const payload = {
            habit: _.pick(habit, ["id", "name", "icon"]),
            criteria: habit.Criteria.map((criterion) =>
                _.pick(criterion, ["id", "name", "icon", "score"])
            ),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
