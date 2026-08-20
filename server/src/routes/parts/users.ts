import { Router } from 'express';
import { userController } from '../../Controllers/UserController.ts'

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/me', userController.me);

export default userRouter;
