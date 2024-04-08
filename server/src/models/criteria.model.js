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
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });

    Criteria.associate = (models) => {
        Criteria.Tree = models.Criteria.belongsToMany(models.Tree, {
            through: "TreeCriteria",
        });
    };

    return Criteria;
}
