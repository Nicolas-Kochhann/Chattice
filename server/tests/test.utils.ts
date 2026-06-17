import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { env } from '../src/env.js';
import { loadTestDBConfigs } from '../src/db/connection.js';

export async function upTestPostgresContainer(){
    const container = await new GenericContainer('postgres:latest')
    .withEnvironment({
        POSTGRES_USER: env.POSTGRES_USER,
        POSTGRES_PASSWORD: env.POSTGRES_SECRET,
        POSTGRES_DB: env.POSTGRES_NAME
    })
    .withExposedPorts(5432)
    .start();

    const mappedPort = container.getMappedPort(5432);
    loadTestDBConfigs(mappedPort);
    
    process.env.POSTGRES_PORT = String(mappedPort); // This will be necessary to run migrations on container;

    return container;
}

export async function downTestPostgresContainer(container: StartedTestContainer){
    await container.stop({ remove: true });
}