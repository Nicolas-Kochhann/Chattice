import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";

export interface ChatRepository
{
    findById(id: number): Promise<Chat|null>;
    getMessages(id: number, cursor: number): Promise<Message[]|null>;
    create(chat: NewChat): Promise<Chat|null>;
    delete(id: number): Promise<void>;
}