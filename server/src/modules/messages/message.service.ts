import { Update } from "drizzle-orm";
import { CreateMessageDTO, NewMessage, UpdateMessageDTO } from "./message.types.js";
import { MessageRepository } from "./repositories/message.repository.js";

export class MessageService 
{
    constructor(private readonly repository: MessageRepository){}

    async create(authorId: number, messageDTO: CreateMessageDTO)
    {
        const message: NewMessage = {
            ...messageDTO,
            authorId: authorId
        }

        return await this.repository.create(message);
    }

    async find(id: number)
    {
        return await this.repository.find(id);
    }

    async update(id: number, messageDTO: UpdateMessageDTO)
    {
        return await this.repository.update(id, messageDTO);
    }

    async delete(id: number)
    {
        await this.repository.delete(id);
    }
}