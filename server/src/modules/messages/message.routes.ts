import { FastifyPluginAsync } from "fastify";
import { MessageController } from "./message.controller.js";
import { MessageService } from "./message.service.js";
import { DrizzleMessageRepository } from "./repositories/drizzle.repository.js";
import { createMessageDTOSchema, messageParamsSchema, updateMessageDTOSchema } from "./message.types.js";


export const messageRoutes: FastifyPluginAsync = async (app, options) => {

    const service = new MessageService(new DrizzleMessageRepository());
    const controller = new MessageController(service);

    const createSchema = {
        body: createMessageDTOSchema
    }

    const updateSchema = {
        params: messageParamsSchema,
        body: updateMessageDTOSchema
    }

    const deleteSchema = {
        params: messageParamsSchema
    }

    app.post('/', { schema: createSchema }, controller.createMessage);
    app.patch('/:id', { schema: updateSchema }, controller.updateMessage);
    app.delete('/:id', { schema: deleteSchema }, controller.deleteMessage);

}