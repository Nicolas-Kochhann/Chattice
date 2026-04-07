import { timestamp, varchar, text, integer, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 256 }).notNull(),
    email: varchar({ length: 256 }).unique().notNull(),
    passwordHash: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull()
});