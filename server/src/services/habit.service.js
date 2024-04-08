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
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: conditions,
            include: [
                {
                    association: Habit.Criteria,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ],
        });

    update = async (instance, data) => instance.update(data);
}

export default new HabitService();
