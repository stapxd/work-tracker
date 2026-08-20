import express, { type Express, type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import { db } from './db/index.ts';

import router from "./routes/index.ts";
import { sql } from 'drizzle-orm';

async function startServer() {
  try {
    await db.execute(sql`SELECT 1`);

    const port = process.env.PORT || 3000;
    const app: Express = express();
    
    app.use(cookieParser());
    app.use(express.json());

    router(app);
    
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
    });
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
      console.log(`http://localhost:${port}`);
    });
  }
  catch(error) {
    console.error('Failed to connect to DB:', error);
    process.exit(1);
  }
}

startServer();