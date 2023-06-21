import { Router } from 'express';
import * as pcController from '../controllers/pcController.js';

export const pcRouter = Router();

pcRouter.get("/getall", pcController.getAll);

pcRouter.get("/getone", pcController.getOne);

pcRouter.post("/creatpc", pcController.createPc);

pcRouter.post("/pingone", pcController.pingOne);

pcRouter.get("/pingall", pcController.pingAll);

pcRouter.delete("/delete/:id", pcController.deletePc);

pcRouter.put("/update/:id", pcController.appdatePc);