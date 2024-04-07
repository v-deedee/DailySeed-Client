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
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });

    User.associate = (models) => {
        User.Profile = models.User.hasOne(models.Profile, {
            onDelete: "CASCADE",
        });
        User.Tree = models.User.hasMany(models.Tree, {
            onDelete: "CASCADE",
        });
        User.Habit = models.User.hasMany(models.Habit, {
            onDelete: "CASCADE",
        });
    };

    return User;
}
