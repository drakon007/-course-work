import { Router } from "express";
import * as authController  from '../controllers/authController.js';

export const authRouter = new Router();

// ручная регистрация пользователя
authRouter.get("/register", authController.register);

// авторизация пользователя 
authRouter.post("/login", authController.login);

