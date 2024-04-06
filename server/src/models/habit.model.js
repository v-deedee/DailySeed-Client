export default function (sequelize, DataTypes) {
    const Habit = sequelize.define("Habit", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Habit.associate = (models) => {
        Habit.Criteria = models.Habit.hasMany(models.Criteria, {
            onDelete: "CASCADE",
        });
    };

    return Habit;
}
