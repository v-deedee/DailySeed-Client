import { DataTypes } from "sequelize";
import sequelize from "../utils/orm";
import User from "./user";

const Profile = sequelize.define("Profile", {
    profile_id: {
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

Profile.belongsTo(User, {
    onDelete: "CASCADE",
});

export default Profile;