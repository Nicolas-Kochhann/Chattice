import test, { suite } from "node:test";
import { strict as assert } from 'node:assert';
import { ChatService } from "../../src/modules/chats/chat.service.js";
import { MockChatRepository } from "../../src/modules/chats/repositories/mock.repository.js";
import { ChatDoesNotExists } from "../../src/modules/chats/chat.errors.js";

suite('ChatService', () => {

    test('ChatService - Create success', async () => {
        const chatService = new ChatService(new MockChatRepository());
        
        const result = await chatService.create({ isGroup: false }, 1, 2);

        assert(result.id === 1);
        assert(result.isGroup === false);
        assert(result.createdAt && result.updatedAt);
    });

    test('ChatService - Get chats success', async () => {
        const repository = new MockChatRepository();
        const chatService = new ChatService(repository);

        await repository.create({ isGroup: false }, 1, 2);
        await repository.create({ isGroup: true }, 1, 3);

        const chats = await chatService.getChats(1);

        assert(Array.isArray(chats));
        assert(chats.length === 2);

        const chatIds = chats.map((chat) => chat.id).sort((a, b) => a - b);
        assert.deepEqual(chatIds, [1, 2]);
        assert(Array.isArray(chats[1].users));
    });

    test('ChatService - Get chat success', async () => {
        const repository = new MockChatRepository();
        const chatService = new ChatService(repository);

        await repository.create({ isGroup: false }, 1, 2);

        const chat = await chatService.getChat(1);

        assert(chat.id === 1);
        assert(chat.users?.length === 2);
        assert(chat.users?.[0].id === 1);
    });

    test('ChatService - Get chat not found', async () => {
        const chatService = new ChatService(new MockChatRepository());

        await assert.rejects(
            async () => { await chatService.getChat(1); },
            (error: unknown) => {
                assert(error instanceof ChatDoesNotExists);
                return true;
            }
        );
    });

    test('ChatService - Get chat messages success', async () => {
        const repository = new MockChatRepository();
        const chatService = new ChatService(repository);

        await repository.create({ isGroup: false }, 1, 2);

        const firstMessage = {
            id: 1,
            text: 'Hello',
            authorId: 1,
            chatId: 1,
            createdAt: new Date()
        }

        const secondMessage = {
            id: 2,
            text: 'Hi',
            authorId: 2,
            chatId: 1,
            createdAt: new Date()
        }

        await repository.createMessage(firstMessage);
        await repository.createMessage(secondMessage);

        const allMessages = await chatService.getChatMessages(1);

        assert(allMessages.messages.length === 2);
        assert(allMessages.messages[0].id === 2);
        assert(allMessages.messages[1].id === 1);
        assert(allMessages.cursor === 1);

        const pagedMessages = await chatService.getChatMessages(1, 2);

        assert(pagedMessages.messages.length === 1);
        assert(pagedMessages.messages[0].id === 1);
        assert(pagedMessages.cursor === 1);
    });

});