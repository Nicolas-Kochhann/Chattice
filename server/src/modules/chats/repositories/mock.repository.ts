import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";
import { ChatRepository } from "./chat.repository.js";

export class MockRepository implements ChatRepository {
    private chats: Chat[] = [];
    private messages: Message[] = [];
    private chatIdCounter = 1;
    private messageIdCounter = 1;

    async findById(id: number): Promise<Chat | null> 
    {
        return this.chats.find((chat) => chat.id === id) || null;
    }

    async getMessages(id: number, cursor: number): Promise<Message[] | null> 
    {
        const chat = await this.findById(id);
        if (!chat) return null;

        return this.messages
            .filter((message) => message.chatId === id && message.id > cursor)
            .sort((a, b) => a.id - b.id);
    }

    async create(chat: NewChat): Promise<Chat | null> 
    {
        const newChat: Chat = {
            ...chat,
            id: this.chatIdCounter++,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Chat;

        this.chats.push(newChat);
        return newChat;
    }

    async delete(id: number): Promise<void> 
    {
        this.chats = this.chats.filter((chat) => chat.id !== id);
        this.messages = this.messages.filter((message) => message.chatId !== id);
    }

}
