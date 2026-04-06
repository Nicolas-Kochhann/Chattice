import type { Config } from "drizzle-kit";
import { env } from "./config/env";

export default {
    schema: "./config/drizzle/schema",
    out: "./config/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        database: env.POSTGRES_NAME,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_SECRET
    }
} satisfies Config
