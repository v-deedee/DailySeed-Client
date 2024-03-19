import sequelize from "../../../config/database";

const User = sequelize.define('User', {
  username: DataTypes.STRING,
});

export default User;