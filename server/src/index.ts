import express, { type Express, type Request, type Response } from 'express';
import dotenv from "dotenv";
import { drizzle } from 'drizzle-orm/node-postgres';

dotenv.config();
const port = process.env.PORT || 3000;

const app: Express = express();

import router from "./routes/index.ts";
router(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});