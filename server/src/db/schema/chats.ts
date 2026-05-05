import { timestamp, integer, boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const chats = pgTable('chats', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    isGroup: boolean('is_group').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});
