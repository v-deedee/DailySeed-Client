import { Router } from "express";
import controller from "../controllers/index.js";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import habitRouter from "./habit.router.js";

const router = Router();
controller(router, authRouter);
controller(router, userRouter);
controller(router, habitRouter);
export default router;
