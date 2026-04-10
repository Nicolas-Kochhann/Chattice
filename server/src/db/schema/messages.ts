import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users.js";
import { chats } from "./chats.js";

export const messages = pgTable('messages', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    text: text().notNull(),
    authorId: integer('author_id').references(() => users.id),
    chatId: integer('chat_id').references(() => chats.id),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
    sendedMessages: many(messages)
}));

export const chatsRelations = relations(chats, ({ many }) => ({
    messages: many(messages)
}));

export const messagesRelations = relations(messages, ({ one }) => ({
    author: one(users, {
        fields: [messages.authorId],
        references: [users.id]
    }),
    chat: one(chats, {
        fields: [messages.chatId],
        references: [chats.id]
    })
}));