import { type Express } from "express";

import userRouter from './parts/users.ts';
import jobRouter from "./parts/jobs.ts";

export default function router(app: Express) {
    app.use('/auth', userRouter);
    app.use('/jobs', jobRouter);
}