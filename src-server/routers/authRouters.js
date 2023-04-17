import { Router } from "express";
import { authController } from '../controllers/authController.js';

export const authRouter = new Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

