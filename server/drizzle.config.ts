import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
    schema: "./src/db/schema",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        database: env.POSTGRES_NAME,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_SECRET
    }
} satisfies Config
