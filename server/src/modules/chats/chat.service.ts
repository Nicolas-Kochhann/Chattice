import { Domain } from "node:domain";
import { Chat, NewChat } from "./chat.types.js";
import { ChatRepository } from "./repositories/chat.repository.js";
import { DomainError } from "../../errors/domain.error.js";
import { ChatDoesNotExists } from "./chat.errors.js";

class ChatService 
{
    constructor(private repository: ChatRepository){}

    async create(newChat: NewChat)
    {
        const chat: Chat = await this.repository.create(newChat);
        return chat;
    }

    async getChat(id: number)
    {
        const chat = await this.repository.findById(id);
        if(!chat) throw new ChatDoesNotExists();

        const lastMessage = await this.repository.findLastMessage(chat);

        return { chat: chat, lastMessage: lastMessage }
    }
}