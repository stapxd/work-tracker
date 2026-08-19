import dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const dbUser = process.env.POSTGRES_USER;
const dbPwd = process.env.POSTGRES_PWD;
const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;
const dbDatabase = process.env.POSTGRES_DB;
const connectionString = `postgres://${dbUser}:${dbPwd}@${dbHost}:${dbPort}/${dbDatabase}`;

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString!,
  },
});
