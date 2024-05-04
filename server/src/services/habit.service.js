import db from "../models/index.js";

const { Habit } = db;

class HabitService {
    constructor() {}

    create = async (data) =>
        Habit.create(data, {
            include: [{ association: Habit.Criteria }],
        });

    findOne = async (conditions, attributes) =>
        Habit.findOne({
            where: conditions,
            attributes: attributes,
            include: [{ association: Habit.Criteria, where: { active: true } }],
        });

    update = async (instance, data) => instance.update(data);

    findAll = async (conditions = {}, attributes = []) =>
        Habit.findAll({
            where: conditions,
            attributes: attributes,
            include: [{ association: Habit.Criteria, where: { active: true } }],
        });
}

export default new HabitService();
