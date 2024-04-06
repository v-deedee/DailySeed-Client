export default function (sequelize, DataTypes) {
    const Seed = sequelize.define("Seed", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        asset: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Seed.associate = (models) => {
        models.Seed.belongsToMany(models.User, {
            through: "UserSeed",
        });
        models.Seed.hasMany(models.Tree);
    };

    return Seed;
}
