import { type Express } from "express";

import userRouter from './parts/users.ts';

export default function router(app: Express) {
    app.use('/auth', userRouter);
}