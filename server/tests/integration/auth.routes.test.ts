import { FastifyInstance } from 'fastify';
import { StartedTestContainer } from 'testcontainers';
import { after, before, suite, test } from 'node:test';
import { execSync } from 'node:child_process';
import { strict as assert } from 'node:assert';
import { buildApp } from '../../src/app.js';
import { upTestPostgresContainer, downTestPostgresContainer } from '../test.utils.js';
import { env } from '../../src/env.js';
import { pool } from '../../src/db/connection.js';

suite('Auth Routes', () => {
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

    test('POST /auth/register', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/auth/register',
            headers: { 'content-type': 'application/json' },
            payload: {
                name: 'John Doe',
                email: 'test@example.com',
                password: 'password123'
            }
        });

        assert(response.statusCode === 201);
        assert(response.headers['content-type'] === 'application/json; charset=utf-8');
        assert(response.headers['x-api-token'] && response.headers['x-refresh-token']);
        
        const body = response.json();

        assert(body.user.id === 1);
        assert(body.user.name === 'John Doe');
        assert(body.user.email === 'test@example.com');

    });

    test('POST /auth/login', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/auth/login',
            headers: { 'content-type': 'application/json' },
            payload: {
                email: 'test@example.com',
                password: 'password123'
            }
        });

        assert(response.statusCode === 200);
        assert(response.headers['content-type'] === 'application/json; charset=utf-8');
        
        const body = response.json();

        assert(body.user.id === 1);
        assert(body.user.name === 'John Doe');
        assert(body.user.email === 'test@example.com');
    })

});
