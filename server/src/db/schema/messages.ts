import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { chats } from "./chats.js";

export const messages = pgTable('messages', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    text: text('text').notNull(),
    authorId: integer('author_id').references(() => users.id),
    chatId: integer('chat_id').references(() => chats.id),
    createdAt: timestamp('created_at').defaultNow().notNull()
});