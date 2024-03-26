import { DataTypes } from "sequelize";
import sequelize from "../utils/orm";
import roles from "../constants/user.role";

const User = sequelize.define("User", {
    user_id: {
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
        defaultValue: roles.USER,
        validate: {
            isIn: {
                args: [Object.values(roles)],
                msg: `Role must be one of ${Object.values(roles).join(", ")}`,
            },
        },
    },
    money: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    picture: {
        type: DataTypes.STRING,
    },
});

export default User;
