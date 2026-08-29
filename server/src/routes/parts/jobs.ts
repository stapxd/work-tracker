import { Router } from 'express';
import { jobController } from '../../Controllers/JobController.ts'

import { authMiddleware } from '../../Middlewares/AuthMiddleware.ts';

const jobRouter = Router();

jobRouter.post('/create', authMiddleware, jobController.create);
jobRouter.delete('/delete', authMiddleware, jobController.delete);
jobRouter.patch('/edit',   authMiddleware, jobController.edit);

export default jobRouter;
