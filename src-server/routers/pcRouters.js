import { Router } from 'express';
import * as pcController from '../controllers/pcController.js';

export const pcRouter = Router();

pcRouter.get("/getall", pcController.getAll);

pcRouter.get("/getone", pcController.getOne);

