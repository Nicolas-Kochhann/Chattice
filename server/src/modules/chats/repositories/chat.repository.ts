import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";

export interface ChatRepository
{
    findById(id: number): Promise<Chat|null>;
    getMessages(id: number): Promise<Message[]|null>;
    create(chat: NewChat): Promise<Chat|null>;
    delete(id: number): void;
}