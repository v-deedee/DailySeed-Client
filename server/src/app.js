import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routers/router.js";
import errorHandler from "./middlewares/error.handler.js";

// Init Epxress App
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/", router);
app.use(errorHandler);

app.use((req, res) => {
    res.status(200).json({
        message: "Welcome to DailySeed API server",
        information:
            "This server is a part Mobile Application Development Course in UET, VNU",
    });
});

export default app;
