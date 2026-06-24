import { FastifyPluginAsync } from "fastify";
import { ChatController } from "./chat.controller.js";
import { ChatService } from "./chat.service.js";
import { DrizzleChatRepository } from "./repositories/drizzle.repository.js";
import { chatCreateDTOSchema, chatGetMessagesSchema } from "./chat.types.js";


export const chatRoutes: FastifyPluginAsync = async (app, options) => {

    const controller = new ChatController(new ChatService(new DrizzleChatRepository()));

    const createSchema = {
        body: chatCreateDTOSchema
    }

    const getMessagesSchema = {
        params: chatGetMessagesSchema
    }

    app.post('/', { schema: createSchema }, controller.createChat);
    app.get('/', controller.getChats);
    app.get("/:id", { schema: getMessagesSchema }, controller.getChatMessages);

}