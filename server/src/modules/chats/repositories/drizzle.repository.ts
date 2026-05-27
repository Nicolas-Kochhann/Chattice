import { ChatRepository } from "./chat.repository.js";
import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";
import { db } from "../../../db/connection.js";
import { chats } from "../../../db/schema/chats.js"
import { and, desc, eq, lt } from "drizzle-orm";
import { messages } from "../../../db/schema/messages.js";
import { env } from "../../../env.js";


export class DrizzleRepository implements ChatRepository
{
    async findById(id: number): Promise<Chat|null> 
    { 
        const result = await db.query.chats.findFirst({
            where: (chats, { eq }) => eq(chats.id, id)
        });

        if(!result) return null;
        return result;
    };

    async findMessages(id: number, cursor?: number): Promise<Message[]|null> 
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

    async findLastMessage({ id }: Chat): Promise<Message|null> 
    {
        const [ result ] = await db
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

        return result;
    }

    async create(chat: NewChat): Promise<Chat> 
    {
        const [ result ] = await db.insert(chats).values(chat).returning({
            id: chats.id,
            isGroup: chats.isGroup,
            createdAt: chats.createdAt,
            updatedAt: chats.updatedAt
        });

        return result;
    };

    async delete(id: number): Promise<void> 
    {
        await db.delete(chats).where(eq(chats.id, id));
    }
}