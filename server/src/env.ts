import z from "zod";

const envSchema = z.object({
    API_PORT: z.coerce.number().default(3000),
    API_KEY: z.string(),
    API_REFRESH_KEY: z.string(),
    POSTGRES_HOST: z.string().default("127.0.0.1"),
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_NAME: z.string().default("chattice"),
    POSTGRES_USER: z.string().default("root"),
    POSTGRES_SECRET: z.string(),
    POSTGRES_SSL_SUPPORT: z.coerce.boolean().default(false),
    MESSAGE_LIMIT_PER_REQUEST: z.coerce.number().default(20)
});

export let env = envSchema.parse(process.env);