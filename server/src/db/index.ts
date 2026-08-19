import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';

const dbUser = process.env.POSTGRES_USER;
const dbPwd = process.env.POSTGRES_PWD;
const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;
const dbDatabase = process.env.POSTGRES_DB;
const connectionString = `postgres://${dbUser}:${dbPwd}@${dbHost}:${dbPort}/${dbDatabase}`;

const client = postgres(connectionString);
export const db = drizzle(client, { schema });