import z from "zod";

const envSchema = z.object({
    API_PORT: z.coerce.number().default(3000),
    POSTGRES_HOST: z.string().default("127.0.0.1"),
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_NAME: z.string().default("meghaffone"),
    POSTGRES_USER: z.string().default("root"),
    POSTGRES_SECRET: z.string()
});

export const env = envSchema.parse(process.env);