import { timestamp } from "drizzle-orm/pg-core";
import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const messages = pgTable('messages', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    text: text().notNull(),
    createdAt: timestamp().defaultNow().notNull()
});