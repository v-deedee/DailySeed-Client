export default function (sequelize, DataTypes) {
    const Profile = sequelize.define("Profile", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        money: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue: "default picture url here",
        },
    });

    return Profile;
}
