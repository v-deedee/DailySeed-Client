export default function (sequelize, DataTypes) {
    const Criteria = sequelize.define("Criteria", {
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
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Criteria.associate = (models) => {
        models.Criteria.belongsTo(models.Habit, {
            onDelete: "CASCADE",
        });
        models.Criteria.belongsToMany(models.Tree, {
            through: "TreeCriteria",
        });
    };

    return Criteria;
}
