export default function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    User.associate = (models) => {
        models.User.hasOne(models.Profile);
        models.User.belongsToMany(models.Seed, {
            through: "UserSeed",
        });
        models.User.hasMany(models.Tree);
        models.User.hasMany(models.Habit);
    };

    return User;
}
