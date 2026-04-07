import { timestamp, integer, pgTable } from "drizzle-orm/pg-core";

export const chats = pgTable('chats', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull()
});