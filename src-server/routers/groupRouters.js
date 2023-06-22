import { Router } from 'express';
import * as groupController from '../controllers/groupController.js';

export const groupRouter = new Router();

groupRouter.get("/getall", groupController.getAllGroup);

groupRouter.get("/getone/:id", groupController.getOneGroup);

groupRouter.put("/addpc", groupController.addInGroup);

groupRouter.put("/deletpc", groupController.deletInGroup);

groupRouter.delete("/delete/:id", groupController.deleteGroup);

groupRouter.post("/create", groupController.createGroup);

