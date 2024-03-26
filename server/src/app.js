import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import sequelize from "./utils/orm";
import error from "./constants/error.code";
import router from "./routers/router";

// Load env variables
dotenv.config();
const PORT = process.env.PORT || 5050;
const HOSTNAME = process.env.HOSTNAME || "localhost";

// Init Epxress App
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", router);
app.use((req, res, next) => {
    res.status(404).json({
        ...error.URL_NOT_FOUND,
    });
});

const httpServer = http.createServer(app);
httpServer.listen(PORT, HOSTNAME, () => {
    console.log(`Server started running at ${HOSTNAME}:${PORT}`);
});

// Connect to Database
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();
