import { Chat, NewChat } from "../chat.types.js";
import { Message, NewMessage } from "../../messages/message.types.js";
import { User } from "../../users/user.types.js";
import { ChatRepository } from "./chat.repository.js";
import { env } from "../../../env.js";

export class MockChatRepository implements ChatRepository {
    private chats: Chat[] = [];
    private messages: Message[] = [];
    private chatUsers = new Map<number, number[]>();
    private chatIdCounter = 1;
    private messageIdCounter = 1;

    async findById(id: number): Promise<Chat | null> {
        const chat = this.chats.find((item) => item.id === id);
        if (!chat) return null;

        const users = (this.chatUsers.get(id) ?? []).map((userId) => ({ id: userId } as User));
        const lastMessage = await this.findLastMessage(chat);

        return {
            ...chat,
            users,
            lastMessage,
        } as Chat;
    }

    async getUserChats(userId: number): Promise<Chat[]> {
        const chats = this.chats
            .filter((chat) => (this.chatUsers.get(chat.id) ?? []).includes(userId))
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
            .map((chat) => {
                const users = (this.chatUsers.get(chat.id) ?? []).map((id) => ({ id } as User));
                const lastMessage = this.messages
                    .filter((message) => message.chatId === chat.id)
                    .sort((a, b) => b.id - a.id)
                    .at(0) || null;

                return {
                    ...chat,
                    users,
                    lastMessage,
                } as Chat;
            });

        return chats;
    }

    async findMessages(id: number, cursor?: number): Promise<Message[]> {
        const messages = this.messages
            .filter((message) => message.chatId === id)
            .sort((a, b) => b.id - a.id);

        if (cursor) {
            return messages
                .filter((message) => message.id < cursor)
                .slice(0, env.MESSAGE_LIMIT_PER_REQUEST);
        }

        return messages.slice(0, env.MESSAGE_LIMIT_PER_REQUEST);
    }

    async findLastMessage({ id }: Chat): Promise<Message | null> {
        const messages = this.messages
            .filter((message) => message.chatId === id)
            .sort((a, b) => b.id - a.id);

        return messages[0] || null;
    }

    async create(chat: NewChat, claimantId: number, guestId: number): Promise<Chat> {
        const newChat: Chat = {
            ...chat,
            id: this.chatIdCounter++,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Chat;

        this.chats.push(newChat);
        this.chatUsers.set(newChat.id, [claimantId, guestId]);

        return newChat;
    }

    async createMessage(message: Message): Promise<Message> {
        const newMessage: Message = {
            ...message,
            id: message.id ?? this.messageIdCounter++,
            createdAt: message.createdAt ?? new Date(),
        } as Message;

        this.messages.push(newMessage);
        return newMessage;
    }

    async delete(id: number): Promise<void> {
        this.chats = this.chats.filter((chat) => chat.id !== id);
        this.messages = this.messages.filter((message) => message.chatId !== id);
        this.chatUsers.delete(id);
    }
}
