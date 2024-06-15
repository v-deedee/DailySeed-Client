import errorCode from "../constants/error.code.js";
import { HttpError } from "../utils/http.error.js";
import HabitService from "../services/habit.service.js";
import CriteriaService from "../services/criteria.service.js";
import TreeService from "../services/tree.service.js";
import _ from "lodash";

export default class HabitController {
    constructor() {}

    createHabit = async (req, res) => {
        const { body } = req;
        const { user } = req;
        body.habit.UserId = user.id;
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
        const { user } = req;

        const habit = await HabitService.findOne({ id: params.id });
        if (!habit)
            throw new HttpError({
                ...errorCode.HABIT.HABIT_NOT_FOUND,
                status: 400,
            });
        if (habit.UserId != user.id)
            throw new HttpError({
                ...errorCode.HABIT.INVALID_AUTHORIZATION,
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
        const { user } = req;
        const { params } = req;
        const { body } = req;

        const habit = await HabitService.findOne({ id: params.id });
        if (!habit)
            throw new HttpError({
                ...errorCode.HABIT.HABIT_NOT_FOUND,
                status: 400,
            });
        if (habit.UserId != user.id)
            throw new HttpError({
                ...errorCode.HABIT.INVALID_AUTHORIZATION,
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

            if (!updatedHabit.active) {
                for (const criterion of updatedHabit.Criteria) {
                    await CriteriaService.update(criterion, { active: false });
                }

                delete body.criteria;
            }
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
            habit: updatedHabit.active
                ? _.pick(updatedHabit, ["id", "name", "icon", "duration"])
                : null,
            criteria: updatedCriteria
                .filter((criterion) => criterion.active)
                .map((criterion) =>
                    _.pick(criterion, ["id", "name", "icon", "score"])
                ),
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    listTrackingHabit = async (req, res) => {
        const { user } = req;
        const { params } = req;

        const tree = await TreeService.findOne({ id: params.treeId });
        if (!tree)
            throw new HttpError({ ...errorCode.TREE.NOT_FOUND, status: 403 });
        if (tree.UserId != user.id)
            throw new HttpError({
                ...errorCode.TREE.INVALID_AUTHORIZATION,
                status: 403,
            });

        const selectedCriteria = _.keyBy(await tree.getCriteria(), "HabitId");

        const habits = await HabitService.findAll({
            UserId: user.id,
            active: true,
        });
        habits.forEach(async (habit, index) => {
            habits[index] = _.pick(habit, ["id", "name", "icon", "duration", "updatedAt"]);
            habits[index].criteria = _.compact(_.map(habit.Criteria, (criterion) => {
                if (criterion.active)
                    return _.pick(criterion, ["id", "name", "score", "icon"]);
            }));

            if (selectedCriteria[habit.id]) {
                habits[index].selected = selectedCriteria[habit.id].id;
            } else {
                habits[index].selected = _.pick(_.find(habit.Criteria, { score: 0}), ["id"]);
            }
        });

        const payload = habits;
        res.status(200).json({
            ok: true,
            data: payload,
        });
    };

    trackHabit = async (req, res) => {
        const { user } = req;
        const { params } = req;
        const { body } = req;

        const tree = await TreeService.findOne({ id: params.treeId });
        if (!tree)
            throw new HttpError({ ...errorCode.TREE.NOT_FOUND, status: 403 });
        if (tree.UserId != user.id)
            throw new HttpError({
                ...errorCode.TREE.INVALID_AUTHORIZATION,
                status: 403,
            });

        tree.setCriteria(_.map(body.criteria, "id"));

        const numOfCriteria = body.criteria.length;
        let score = 0;

        body.criteria.forEach((criterion) => {
            score += criterion.score / (100 * numOfCriteria);
        });

        score *= 100;
        const updatedTree = await TreeService.update(tree, { score: score });

        const payload = {
            tree: _.pick(updatedTree, [
                "id",
                "date",
                "score",
                "note",
                "picture",
            ]),
            seed: _.pick(updatedTree.Seed, ["id", "name", "asset"]),
        };

        res.status(200).json({
            ok: true,
            data: payload,
        });
    };
}
