import { Message, NewMessage, UpdateMessageDTO } from "../../messages/message.types.js";
import { MessageRepository } from "./message.repository.js";

export class MockMessageRepository implements MessageRepository {
    private messages: Message[] = [];
    private idCounter = 1;

    async create(message: NewMessage): Promise<Message> {
        const newMessage: Message = {
            ...message,
            id: this.idCounter++,
            createdAt: new Date(),
        } as Message;

        this.messages.push(newMessage);
        return newMessage;
    }

    async find(id: number): Promise<Message | null> {
        return this.messages.find((message) => message.id === id) || null;
    }

    async update(message: UpdateMessageDTO): Promise<Message> {
        const existingMessage = this.messages.find((item) => item.id === message.id);

        if (!existingMessage) {
            throw new Error(`Message with id ${message.id} not found`);
        }

        const updatedMessage: Message = {
            ...existingMessage,
            ...message,
        } as Message;

        this.messages = this.messages.map((item) =>
            item.id === message.id ? updatedMessage : item
        );

        return updatedMessage;
    }

    async delete(id: number): Promise<void> {
        this.messages = this.messages.filter((message) => message.id !== id);
    }
}
