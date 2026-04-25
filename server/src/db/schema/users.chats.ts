import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { chats } from "./chats.js";
import { users } from "./users.js";

export const chatsUsers = pgTable('chats_users', {
    userId: integer('user_id').references(() => users.id),
    chatId: integer('chat_id').references(() => chats.id),
}, (t) => [
    primaryKey({ columns: [t.chatId, t.userId] }),
]);