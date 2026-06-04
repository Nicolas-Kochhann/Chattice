import { Chat, NewChat } from "../chat.types.js";
import { Message } from "../../messages/message.types.js";
import { ChatRepository } from "./chat.repository.js";
import { env } from "../../../env.js";

export class MockRepository implements ChatRepository {
    private chats: Chat[] = [];
    private messages: Message[] = [];
    private chatIdCounter = 1;
    private messageIdCounter = 1;

    async findById(id: number): Promise<Chat | null> 
    {
        return this.chats.find((chat) => chat.id === id) || null;
    }

    async findMessages(id: number, cursor?: number): Promise<Message[]> 
    {
        const msgs = this.messages.filter((message) => message.chatId === id);
        
        if (cursor) {
            return msgs
                .filter((message) => message.id < cursor)
                .sort((a, b) => b.id - a.id)
                .slice(0, env.MESSAGE_LIMIT_PER_REQUEST);
        }
        
        return msgs.sort((a, b) => b.id - a.id).slice(0, env.MESSAGE_LIMIT_PER_REQUEST);
    }

    async findLastMessage({ id }: Chat): Promise<Message | null> 
    {
        const msgs = this.messages.filter((message) => message.chatId === id);
        if (msgs.length === 0) return null;

        msgs.sort((a, b) => b.id - a.id);
        return msgs[0];
    }

    async create(chat: NewChat): Promise<Chat> 
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

    addMessage(message: Message): void {
        this.messages.push(message);
    }

    async delete(id: number): Promise<void> 
    {
        this.chats = this.chats.filter((chat) => chat.id !== id);
        this.messages = this.messages.filter((message) => message.chatId !== id);
    }

}
