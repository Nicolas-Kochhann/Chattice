import test, { suite } from 'node:test';
import { strict as assert } from 'node:assert';
import { MessageService } from '../../src/modules/messages/message.service.js';
import { MockMessageRepository } from '../../src/modules/messages/repositories/mock.repository.js';
import { CreateMessageDTO, UpdateMessageDTO } from '../../src/modules/messages/message.types.js';

suite('MessageService', () => {
    test('MessageService - create success', async () => {
        const messageService = new MessageService(new MockMessageRepository());
        const messageDTO: CreateMessageDTO = { text: 'Hello world', chatId: 1 };

        const result = await messageService.create(1, messageDTO);

        assert(result.id === 1);
        assert(result.text === 'Hello world');
        assert(result.authorId === 1);
        assert(result.chatId === 1);
        assert(result.createdAt instanceof Date);
    });

    test('MessageService - find success', async () => {
        const repository = new MockMessageRepository();
        const messageService = new MessageService(repository);

        const created = await repository.create({ text: 'Test', authorId: 1, chatId: 2 });
        const message = await messageService.find(created.id);

        assert(message !== null);
        assert.deepEqual(message, created);
    });

    test('MessageService - update success', async () => {
        const repository = new MockMessageRepository();
        const messageService = new MessageService(repository);

        const created = await repository.create({ text: 'Before', authorId: 1, chatId: 3 });

        const updateDTO: UpdateMessageDTO = { text: 'After' };
        const updated = await messageService.update(created.id, updateDTO);

        assert(updated.id === created.id);
        assert(updated.text === 'After');
        assert(updated.authorId === created.authorId);
        assert(updated.chatId === created.chatId);
    });

    test('MessageService - delete success', async () => {
        const repository = new MockMessageRepository();
        const messageService = new MessageService(repository);

        const created = await repository.create({ text: 'Remove me', authorId: 2, chatId: 4 });
        await messageService.delete(created.id);

        const message = await messageService.find(created.id);
        assert(message === null);
    });

    test('MessageService - update missing message rejects', async () => {
        const messageService = new MessageService(new MockMessageRepository());
        const nonExistentId = 999;
        const updateDTO: UpdateMessageDTO = { text: 'Not found' };

        await assert.rejects(
            async () => { await messageService.update(nonExistentId, updateDTO); },
            (error: unknown) => {
                assert(error instanceof Error);
                return (error as Error).message.includes('not found');
            }
        );
    });
});
