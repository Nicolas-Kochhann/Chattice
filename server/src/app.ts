import Fastify from 'fastify';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import WebSocket from '@fastify/websocket';
import { env } from './env.js';
import { authRoutes } from './modules/auth/auth.routes.js';

const app = Fastify({
    logger: true
}).withTypeProvider<ZodTypeProvider>();

// Configure zod as type provider.
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


// Register WebSocket plugin.
await app.register(WebSocket);

await app.register(authRoutes, { prefix: 'auth/' });

app.get('/', { websocket: true }, (socket, request) => {
    socket.send('Conectado');

    socket.on('message', () => {
        socket.send('Pong');
    });
});

app.listen({ port: env.API_PORT }, (err, adresss) => {
    if(err){
        app.log.error(err);
        process.exit(1);
    }
})