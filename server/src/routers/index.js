import { Router } from "express";
import controller from "../controllers/index.js";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import habitRouter from "./habit.router.js";
import treeRouter from "./tree.router.js";
import seedRouter from "./seed.router.js";

const router = Router();
controller(router, authRouter);
controller(router, userRouter);
controller(router, habitRouter);
controller(router, treeRouter);
controller(router, seedRouter);
export default router;
