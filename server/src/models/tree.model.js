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

    Tree.prototype.getPhase = function () {
        return this.score < 25 ? 1 : this.score < 50 ? 2 : this.score < 75 ? 3 : 4;
    }

    Tree.prototype.isPlanted = function () {
        return this.coordinate_x != null && this.coordinate_y != null;
    }

    return Tree;
}
