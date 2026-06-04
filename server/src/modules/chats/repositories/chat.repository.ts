import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";

export interface ChatRepository
{
    findById(id: number): Promise<Chat|null>;
    findMessages(id: number, cursor?: number): Promise<Message[]>;
    findLastMessage(chat: Chat): Promise<Message|null>;
    create(chat: NewChat): Promise<Chat>;
    delete(id: number): Promise<void>;
}