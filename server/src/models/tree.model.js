export default function (sequelize, DataTypes) {
    const Tree = sequelize.define("Tree", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: true,
        },
        note: {
            type: DataTypes.STRING,
        },
        picture: {
            type: DataTypes.STRING,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        coordinate_x: {
            type: DataTypes.INTEGER,
        },
        coordinate_y: {
            type: DataTypes.INTEGER,
        },
    });

    Tree.associate = (models) => {
        Tree.Seed = models.Tree.belongsTo(models.Seed);
        Tree.Criteria = models.Tree.belongsToMany(models.Criteria, {
            through: "TreeCriteria",
        });
    };

    return Tree;
}
