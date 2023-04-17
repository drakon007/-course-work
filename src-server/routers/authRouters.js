import { Router } from "express";
import * as authController  from '../controllers/authController.js';

export const authRouter = new Router();

authRouter.get("/register", authController.register);

authRouter.post("/login", authController.login);

