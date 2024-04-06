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
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coordinate_x: {
            type: DataTypes.INTEGER,
        },
        coordinate_y: {
            type: DataTypes.INTEGER,
        },
    });

    return Tree;
}
