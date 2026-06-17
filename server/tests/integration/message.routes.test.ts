import { FastifyInstance } from 'fastify';
import { StartedTestContainer } from 'testcontainers';
import { after, before, suite, test } from 'node:test';
import { execSync } from 'node:child_process';
import { strict as assert } from 'node:assert';
import { buildApp } from '../../src/app.js';
import { upTestPostgresContainer, downTestPostgresContainer } from '../test.utils.js';
import { pool } from '../../src/db/connection.js';

suite('Message Routes', () => {
    let app: FastifyInstance;
    let container: StartedTestContainer;

    before(async () => {
        container = await upTestPostgresContainer();
        execSync("npm run migrations:migrate");
        app = await buildApp();
    });

    after(async () => {
        pool.end();
        app.close();
        await downTestPostgresContainer(container);
    });

    test('POST /messages, PATCH /messages/:id and DELETE /messages/:id', async () => {
        // Register first user
        const registerA = await app.inject({
            method: 'POST',
            url: '/auth/register',
            headers: { 'content-type': 'application/json' },
            payload: {
                name: 'Charlie',
                email: 'charlie@example.com',
                password: 'password123'
            }
        });

        assert(registerA.statusCode === 201);
        const userA = registerA.json().user;
        const tokenA = registerA.headers['x-api-token'] as string;

        // Register second user
        const registerB = await app.inject({
            method: 'POST',
            url: '/auth/register',
            headers: { 'content-type': 'application/json' },
            payload: {
                name: 'Dana',
                email: 'dana@example.com',
                password: 'password123'
            }
        });

        assert(registerB.statusCode === 201);
        const userB = registerB.json().user;

        // Create chat to hold messages
        const createChat = await app.inject({
            method: 'POST',
            url: '/chats',
            headers: { authorization: `Bearer ${tokenA}`, 'content-type': 'application/json' },
            payload: { guest_id: userB.id }
        });

        assert(createChat.statusCode === 201);
        const chat = createChat.json();

        // Create a message
        const createMessage = await app.inject({
            method: 'POST',
            url: '/messages',
            headers: { authorization: `Bearer ${tokenA}`, 'content-type': 'application/json' },
            payload: {
                chatId: chat.id,
                text: 'Hello world'
            }
        });

        assert(createMessage.statusCode === 201);
        const message = createMessage.json();
        assert(typeof message.id === 'number');
        assert(message.text === 'Hello world');
        assert(message.authorId === userA.id);
        assert(message.chatId === chat.id);

        // Update the message
        const updateMessage = await app.inject({
            method: 'PATCH',
            url: `/messages/${message.id}`,
            headers: { authorization: `Bearer ${tokenA}`, 'content-type': 'application/json' },
            payload: {
                id: message.id,
                text: 'Updated text'
            }
        });

        assert(updateMessage.statusCode === 200);
        const updated = updateMessage.json();
        assert(updated.text === 'Updated text');

        // Delete the message
        const deleteMessage = await app.inject({
            method: 'DELETE',
            url: `/messages/${message.id}`,
            headers: { authorization: `Bearer ${tokenA}` }
        });

        assert(deleteMessage.statusCode === 204);

    });

});
