import { Sequelize } from "sequelize";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true
        },
        // options: {
        //     project: ENDPOINT_ID
        // }
    }
});

export default sequelize;