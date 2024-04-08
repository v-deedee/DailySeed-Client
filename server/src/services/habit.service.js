import db from "../models/index.js";

const { Habit } = db;

class HabitService {
    constructor() {}

    create = async (data) =>
        Habit.create(data, {
            include: [{ association: Habit.Criteria }],
        });

    find = async (conditions) =>
        Habit.findOne({
            where: conditions,
            include: [{ association: Habit.Criteria, where: { active: true } }],
        });

    update = async (instance, data) => instance.update(data);
}

export default new HabitService();
