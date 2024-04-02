import { Router } from "express";
import controller from "../controllers/controller";
import AuthRouter from "./auth.router";
import userRouter from "./user.router";

const router = Router();
controller(router, AuthRouter);
controller(router, userRouter);
export default router;