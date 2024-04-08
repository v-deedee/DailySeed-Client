import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const { DB_TYPE, DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT } =
    process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_TYPE,
    port: parseInt(DB_PORT),
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize;
