import errorCode from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import HabitService from "../services/habit.service.js";
import CriteriaService from "../services/criteria.service.js";
import _ from "lodash";

export default class HabitController {
    constructor() {}

    createHabit = async (req, res) => {
        const { body } = req;
        const { user } = req;
        body.UserId = user.id;
        // Handle association create
        body.habit.Criteria = body.criteria;
        const habit = await HabitService.create(body.habit);

        const payload = {
            habit: _.pick(habit, ["id", "name", "icon", "duration"]),
            criteria: habit.Criteria.map((criterion) =>
                _.pick(criterion, ["id", "name", "icon", "score"])
            ),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    viewHabit = async (req, res) => {
        const { params } = req;

        const habit = await HabitService.findOne({ id: params.id });
        if (!habit)
            throw new HttpError({
                ...errorCode.HABIT.HABIT_NOT_FOUND,
                status: 400,
            });

        const payload = {
            habit: _.pick(habit, ["id", "name", "icon", "duration"]),
            criteria: habit.Criteria.map((criterion) =>
                _.pick(criterion, ["id", "name", "icon", "score"])
            ),
        };
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    updateHabit = async (req, res) => {
        const { params } = req;
        const { body } = req;

        const habit = await HabitService.findOne({ id: params.id });
        if (!habit)
            throw new HttpError({
                ...errorCode.HABIT.HABIT_NOT_FOUND,
                status: 400,
            });

        // const currentDate = new Date();
        // const interval = Math.floor(
        //     (currentDate - habit.updatedAt) / (1000 * 60 * 60 * 24)
        // );
        // if (interval < habit.duration)
        //     throw new HttpError({
        //         ...errorCode.HABIT.HABIT_UPDATE_INVALID,
        //         status: 400,
        //     });

        let updatedHabit = habit;
        if (body.habit) {
            updatedHabit = await HabitService.update(habit, body.habit);
        }

        let updatedCriteria = [];
        if (body.criteria) {
            for (const criterion of body.criteria) {
                let updatedCriterion;

                if (!criterion.id) {
                    // Create
                    criterion.HabitId = habit.id;
                    updatedCriterion = await CriteriaService.create(criterion);
                } else {
                    // Update
                    let i = habit.Criteria.findIndex(
                        (c) => c.id == criterion.id
                    );
                    if (i == -1)
                        throw new HttpError({
                            ...errorCode.HABIT.CRITERION_NOT_FOUND,
                            status: 400,
                        });

                    let toUpdateCriterion = habit.Criteria[i];
                    updatedCriterion = await CriteriaService.update(
                        toUpdateCriterion,
                        criterion
                    );

                    habit.Criteria.splice(i, 1);
                }

                updatedCriteria.push(updatedCriterion);
            }

            updatedCriteria = updatedCriteria.concat(habit.Criteria);
        }

        const payload = {
            habit: _.pick(updatedHabit, ["id", "name", "icon", "duration"]),
            criteria: updatedCriteria.map((criterion) =>
                _.pick(criterion, ["id", "name", "icon", "score"])
            ),
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
