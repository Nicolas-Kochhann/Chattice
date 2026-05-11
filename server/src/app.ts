import Fastify from 'fastify';
import WebSocket from '@fastify/websocket';
import Cookie from '@fastify/cookie';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { authRoutes } from './modules/auth/auth.routes.js';

export async function buildApp(options: object = {})
{
    const app = Fastify(options).withTypeProvider<ZodTypeProvider>();

    // Configure zod as type provider.
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // Cookies setter plugin
    await app.register(Cookie);

    // Register WebSocket plugin.
    await app.register(WebSocket);

    await app.register(authRoutes, { prefix: '/auth' });

    app.get('/', { websocket: true }, (socket, request) => {
        socket.send('Conectado');

        socket.on('message', () => {
            socket.send('Pong');
        });
    });

    return app;
}