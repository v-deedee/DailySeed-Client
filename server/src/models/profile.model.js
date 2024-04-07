export default function (sequelize, DataTypes) {
    const Profile = sequelize.define("Profile", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        money: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue: "https://res.cloudinary.com/dvzkzyy1c/image/upload/v1712504544/default/yhlz6kj6pqq67ejb2jlb.png",
        },
    });

    return Profile;
}
