import { Router } from "express";
import * as userController from "../controllers/userController.js";

export const userRouter = new Router();

userRouter.get("/getall", userController.getAll);