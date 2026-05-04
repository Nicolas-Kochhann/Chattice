import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/index.js";
import { env } from "../env.js";

export const pool = new Pool({
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_SECRET,
    database: env.POSTGRES_NAME,
    port: env.POSTGRES_PORT
});

export const db = drizzle({ client: pool, schema: schema });