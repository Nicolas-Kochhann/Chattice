import { ChatRepository } from "./chat.repository.js";
import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";
import { db } from "../../../db/connection.js";
import { chats } from "../../../db/schema/chats.js"
import { and, desc, eq, lt, sql } from "drizzle-orm";
import { messages } from "../../../db/schema/messages.js";
import { env } from "../../../env.js";
import { chatsUsers } from "../../../db/schema/users.chats.js";
import { users } from "../../../db/schema/users.js";
import { User } from "../../users/user.types.js";


export class DrizzleRepository implements ChatRepository
{
    async findById(id: number): Promise<Chat|null> 
    {
        const chat = await db.transaction(async (tx) => {
            const result = await tx
            .select({
                chats: chats,
                users: users
            })
            .from(chats)
            .innerJoin(chatsUsers, eq(chatsUsers.chatId, chats.id))
            .innerJoin(users, eq(users.id, chatsUsers.userId))
            .where(eq(chats.id, id));

            const [ lastMessage ] = await tx
                .select({
                    id: messages.id,
                    text: messages.text,
                    chatId: messages.chatId,
                    authorId: messages.authorId,
                    createdAt: messages.createdAt
                })
                .from(messages)
                .innerJoin(chats, eq(messages.chatId, chats.id))
                .where(eq(chats.id, id))
                .orderBy(desc(messages.id))
                .limit(1);

            const chat: Chat = {
                ...result[0].chats,
                users: result.map(r => r.users),
                lastMessage: lastMessage
            }

            return chat;
        });

        if(!chat) return null;
        return chat;
    };

    async getUserChats(userId: number): Promise<Chat[]>
    {
        const userChats: Chat[] = await db.transaction(async (tx) => {
            const foundChats: Chat[] = [];

            const subquery = tx
                .select()
                .from(messages)
                .where(eq(messages.chatId, chats.id))
                .orderBy(desc(messages.createdAt))
                .limit(1)
                .as('last_message');

            const result = await tx
                .select()
                .from(chats)
                .innerJoin(chatsUsers, eq(chatsUsers.chatId, chats.id))
                .innerJoin(users, eq(users.id, chatsUsers.userId))
                .leftJoinLateral(subquery, sql`TRUE`)
                .where(eq(chatsUsers.userId, userId))
                .orderBy(desc(chats.updatedAt));

            for(let i = 0; i < result.length; i++){
                const chat: Chat = {
                    ...result[i].chats,
                    users: result
                        .filter(r => r.chats.id === result[i].chats.id)
                        .map(r => r.users),
                    lastMessage: result[i].last_message
                }

                foundChats.push(chat);
            }

            return foundChats;
        });

        return userChats;
    }

    async findMessages(id: number, cursor?: number): Promise<Message[]> 
    {
        let result;

        if(cursor){
            result = await db
                .select({
                    id: messages.id,
                    text: messages.text,
                    chatId: messages.chatId,
                    authorId: messages.authorId,
                    createdAt: messages.createdAt
                })
                .from(messages)
                .innerJoin(chats, eq(messages.chatId, chats.id))
                .where(and(eq(chats.id, id), lt(messages.id, cursor)))
                .orderBy(desc(messages.id))
                .limit(env.MESSAGE_LIMIT_PER_REQUEST);
        } else {
            result = await db
                .select({
                    id: messages.id,
                    text: messages.text,
                    chatId: messages.chatId,
                    authorId: messages.authorId,
                    createdAt: messages.createdAt
                })
                .from(messages)
                .innerJoin(chats, eq(messages.chatId, chats.id))
                .where(eq(chats.id, id))
                .orderBy(desc(messages.id))
                .limit(env.MESSAGE_LIMIT_PER_REQUEST);
        }
        

        return result;
    };

    async create(chat: NewChat, claimantId: number, guestId: number): Promise<Chat> 
    {
        const insertedChat = await db.transaction(async (tx) => {

            const [ result ] = await tx.insert(chats).values(chat).returning({
                id: chats.id,
                isGroup: chats.isGroup,
                createdAt: chats.createdAt,
                updatedAt: chats.updatedAt
            });

            await tx.insert(chatsUsers).values({ userId: claimantId, chatId: result.id });
            await tx.insert(chatsUsers).values({ userId: guestId, chatId: result.id});

            return result;
        });

        return insertedChat;
    };

    async delete(id: number): Promise<void> 
    {
        await db.delete(chats).where(eq(chats.id, id));
    }
}