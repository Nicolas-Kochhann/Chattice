import { Message, NewMessage, UpdateMessageDTO } from "../../messages/message.types.js";

export interface MessageRepository
{
    create(message: NewMessage): Promise<Message>;
    find(id: number): Promise<Message | null>;
    update(id: number, message: UpdateMessageDTO): Promise<Message>;
    delete(id: number): Promise<void>;
}