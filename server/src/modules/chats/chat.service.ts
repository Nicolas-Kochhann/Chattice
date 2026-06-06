import { Domain } from "node:domain";
import { Chat, NewChat } from "./chat.types.js";
import { ChatRepository } from "./repositories/chat.repository.js";
import { DomainError } from "../../errors/domain.error.js";
import { ChatDoesNotExists } from "./chat.errors.js";
import { Message } from "../messages/message.types.js";
import { createUserResponseDTO } from "../users/user.mapper.js";
import { User } from "../users/user.types.js";

export class ChatService 
{
    constructor(private repository: ChatRepository){}

    async create(newChat: NewChat, claimantId: number, guestId: number)
    {
        const chat: Chat = await this.repository.create(newChat, claimantId, guestId);
        return chat;
    }

    async getChats(userId: number)
    {
        const chats = await this.repository.getUserChats(userId);

        for(const chat of chats){
            if(!chat.users) continue;
            chat.users = chat.users?.map(u => createUserResponseDTO(u as User));
        }

        return chats;
    }

    async getChat(id: number)
    {
        const chat = await this.repository.findById(id);
        if(!chat) throw new ChatDoesNotExists();

        chat.users?.map(u => createUserResponseDTO(u as User));

        return chat;
    }

    async getChatMessages(id: number, cursor?: number)
    {
        let messages: Message[];
        if(cursor){
            messages = await this.repository.findMessages(id, cursor);
        } else {
            messages = await this.repository.findMessages(id);
        }

        return { messages: messages, cursor: messages.at(-1)?.id };
    }

}