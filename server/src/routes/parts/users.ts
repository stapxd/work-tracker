import { Router } from 'express';
import { userController } from '../../Controllers/UserController.ts'

import { authMiddleware } from '../../Middlewares/AuthMiddleware.ts';

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/me', authMiddleware, userController.me);

export default userRouter;
