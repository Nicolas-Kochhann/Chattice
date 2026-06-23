import { eq } from "drizzle-orm";
import { db } from "../../../db/connection.js";
import { messages } from "../../../db/schema/messages.js";
import { NewMessage, Message, UpdateMessageDTO } from "../message.types.js";
import { MessageRepository } from "./message.repository.js";

export class DrizzleMessageRepository implements MessageRepository
{
    async create(message: NewMessage): Promise<Message> 
    {
        const [ result ] = await db.insert(messages).values(message).returning({
            id: messages.id,
            text: messages.text,
            authorId: messages.authorId,
            chatId: messages.chatId,
            createdAt: messages.createdAt
        });

        return result;
    }

    async find(id: number): Promise<Message | null>
    {
        const [ message ] = await db.select().from(messages).where(eq(messages.id, id)).limit(1);

        if(!message) return null;
        return message;
    }

    async update(id: number, message: UpdateMessageDTO): Promise<Message> {
        const [ result ] = await db.update(messages).set({ text: message.text }).where(eq(messages.id, id)).returning({
            id: messages.id,
            text: messages.text,
            authorId: messages.authorId,
            chatId: messages.chatId,
            createdAt: messages.createdAt
        });

        return result;
    }

    async delete(id: number): Promise<void>
    {
        await db.delete(messages).where(eq(messages.id, id));
    }
}