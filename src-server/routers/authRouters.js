import { Router } from "express";
import * as authController from "../controllers/authController.js"; //no
export const authRouter = new Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

