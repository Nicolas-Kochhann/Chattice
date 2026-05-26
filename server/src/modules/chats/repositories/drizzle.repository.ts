import { ChatRepository } from "./chat.repository.js";
import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";
import { db } from "../../../db/connection.js";
import { chats } from "../../../db/schema/chats.js"
import { eq } from "drizzle-orm";
import { messages } from "../../../db/schema/messages.js";


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

    async getMessages(id: number, cursor: number): Promise<Message[]|null> 
    {
        const result = await db
            .select({
                id: messages.id,
                text: messages.text,
                chatId: messages.chatId,
                authorId: messages.authorId,
                createdAt: messages.createdAt
            })
            .from(messages)
            .innerJoin(chats, eq(messages.chatId, chats.id))
            .where(eq(chats.id, id));

        return result;
    };

    async create(chat: NewChat): Promise<Chat|null> 
    {
        const [result] = await db.insert(chats).values(chat).returning({
            id: chats.id,
            isGroup: chats.isGroup,
            createdAt: chats.createdAt,
            updatedAt: chats.updatedAt
        });

        if(!result) return null;
        return result;
    };

    async delete(id: number): Promise<void> 
    {
        await db.delete(chats).where(eq(chats.id, id));
    }
}