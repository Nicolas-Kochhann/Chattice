import { timestamp, integer, pgTable } from "drizzle-orm/pg-core";

export const chats = pgTable('chats', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});