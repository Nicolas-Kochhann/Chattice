import Fastify from 'fastify';
import WebSocket from '@fastify/websocket';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { authRoutes } from './modules/auth/auth.routes.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { authHook } from './hooks/auth.hook.js';
import { chatRoutes } from './modules/chats/chat.routes.js';

export async function buildApp(options: object = {})
{
    const app = Fastify(options).withTypeProvider<ZodTypeProvider>();

    // Configure zod as type provider.
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // Create user property on request object.
    app.decorateRequest('user', null);

    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'Chattice API',
                version: '0.0.1'
            }
        },
        transform: jsonSchemaTransform
    });

    app.register(fastifySwaggerUi, {
        routePrefix: '/docs'
    });


    await app.register(authRoutes, { prefix: '/auth' });

    // Protected routes go here.
    app.register(async function protectedRoutes(app, options) {

        await app.register(chatRoutes, { prefix: '/chats' });

    });

    // Register WebSocket plugin.
    await app.register(WebSocket);

    app.get('/', { websocket: true }, (socket, request) => {
        socket.send('Conectado');

        socket.on('message', () => {
            socket.send('Pong');
        });
    });

    return app;
}

// Declaring module to Typescript know i create user property on FastifyRequest type.
declare module 'fastify' {
    interface FastifyRequest {
        user: { id: number, name: string, email: string } | null
    }
}