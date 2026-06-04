import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";
import { User } from "../../users/user.types.js";

export interface ChatRepository
{
    findById(id: number): Promise<Chat|null>;
    getUserChats(userId: number): Promise<Chat[]>
    findMessages(id: number, cursor?: number): Promise<Message[]>;
    create(chat: NewChat, claimantId: number, guestId: number): Promise<Chat>;
    delete(id: number): Promise<void>;
}