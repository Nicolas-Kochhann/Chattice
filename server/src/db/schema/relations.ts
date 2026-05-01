import { relations } from "drizzle-orm";
import { users, chats, messages, chatsUsers } from "./index.js";

export const usersRelations = relations(users, ({ many }) => ({
    sendedMessages: many(messages),
    chatsUsers: many(chatsUsers)
}));

const chatsRelations = relations(chats, ({ many }) => ({
    messages: many(messages),
    users: many(chatsUsers)
}));

const messagesRelations = relations(messages, ({ one }) => ({
    author: one(users, {
        fields: [messages.authorId],
        references: [users.id]
    }),
    chat: one(chats, {
        fields: [messages.chatId],
        references: [chats.id]
    })
}));

const chatsUsersRelations = relations(chatsUsers, ({ one }) => ({
    user: one(users, {
        fields: [chatsUsers.userId],
        references: [users.id],
    }),
    chat: one(chats, {
        fields: [chatsUsers.chatId],
        references: [chats.id],
    })
}));

