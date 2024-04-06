import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import error from "./constants/error.code.js";
import router from "./routers/router.js";
import errorHandler from "./middlewares/error.handler.js";

// Init Epxress App
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", router);
app.use(errorHandler);
app.use((req, res, next) => {
    res.status(404).json({
        ...error.URL_NOT_FOUND,
    });
});

export default app;
