import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { chats } from "./chats.js";
import { users } from "./users.js";

export const chatsUsers = pgTable('chats_users', {
    userId: integer('user_id').references(() => users.id),
    chatId: integer('chat_id').references(() => chats.id),
}, (t) => [
    primaryKey({ columns: [t.chatId, t.userId] }),
]);

export const usersRelations = relations(users, ({ many }) => ({
    chatsUsers: many(chatsUsers),
}));

export const chatsRelations = relations(chats, ({ many }) => ({
    chatsUsers: many(chatsUsers),
}));

export const chatsUsersRelations = relations(chatsUsers, ({ one }) => ({
    user: one(users, {
        fields: [chatsUsers.userId],
        references: [users.id],
    }),
    chat: one(chats, {
        fields: [chatsUsers.chatId],
        references: [chats.id],
    })
}));