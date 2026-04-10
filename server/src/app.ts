import Fastify from 'fastify';
import WebSocket from '@fastify/websocket';
import { env } from './env.js';

const app = Fastify({
    logger: true
});

await app.register(WebSocket);

app.get('/*', { websocket: true }, (socket, request) => {
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