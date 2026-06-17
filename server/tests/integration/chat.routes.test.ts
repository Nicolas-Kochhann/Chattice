import { FastifyInstance } from 'fastify';
import { StartedTestContainer } from 'testcontainers';
import { after, before, suite, test } from 'node:test';
import { execSync } from 'node:child_process';
import { strict as assert } from 'node:assert';
import { buildApp } from '../../src/app.js';
import { upTestPostgresContainer, downTestPostgresContainer } from '../test.utils.js';
import { pool } from '../../src/db/connection.js';

suite('Chat Routes', () => {
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

    test('POST /chats and GET /chats and GET /chats/:id', async () => {
        // Register first user
        const registerA = await app.inject({
            method: 'POST',
            url: '/auth/register',
            headers: { 'content-type': 'application/json' },
            payload: {
                name: 'Alice',
                email: 'alice@example.com',
                password: 'password123'
            }
        });

        assert(registerA.statusCode === 201);
        assert(registerA.headers['x-api-token'] && registerA.headers['x-refresh-token']);

        const userA = registerA.json().user;
        const tokenA = registerA.headers['x-api-token'] as string;

        // Register second user
        const registerB = await app.inject({
            method: 'POST',
            url: '/auth/register',
            headers: { 'content-type': 'application/json' },
            payload: {
                name: 'Bob',
                email: 'bob@example.com',
                password: 'password123'
            }
        });

        assert(registerB.statusCode === 201);
        const userB = registerB.json().user;

        // Create chat between A (claimant) and B (guest)
        const createChat = await app.inject({
            method: 'POST',
            url: '/chats',
            headers: { authorization: `Bearer ${tokenA}`, 'content-type': 'application/json' },
            payload: {
                guest_id: userB.id
            }
        });

        assert(createChat.statusCode === 201);
        const chat = createChat.json();
        assert(typeof chat.id === 'number');

        // Get chats for user A
        const list = await app.inject({
            method: 'GET',
            url: '/chats',
            headers: { authorization: `Bearer ${tokenA}` }
        });

        assert(list.statusCode === 200);
        const chats = list.json();
        assert(Array.isArray(chats));
        assert(chats.length >= 1);

        const found = chats.find((c: any) => c.id === chat.id);
        assert(found, 'Created chat should be present in list');
        assert(Array.isArray(found.users));
        assert(found.users.some((u: any) => u.id === userA.id));
        assert(found.users.some((u: any) => u.id === userB.id));

        // Get messages for chat (should be empty initially)
        const getMessages = await app.inject({
            method: 'GET',
            url: `/chats/${chat.id}`,
            headers: { authorization: `Bearer ${tokenA}` }
        });

        assert(getMessages.statusCode === 200);
        const body = getMessages.json();
        assert(Array.isArray(body.messages));
        assert(body.messages.length === 0);

    });

});
