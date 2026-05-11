import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { env } from '../src/env.js';

export async function upTestPostgresContainer(){
    return await new GenericContainer('postgres:latest')
    .withEnvironment({
        POSTGRES_USER: env.POSTGRES_USER,
        POSTGRES_PASSWORD: env.POSTGRES_SECRET,
        POSTGRES_DB: env.POSTGRES_NAME
    })
    .withExposedPorts({ 
        container: 5432,
        host: env.POSTGRES_PORT
    })
    .start();
}

export async function downTestPostgresContainer(container: StartedTestContainer){
    await container.stop({ remove: true });
}