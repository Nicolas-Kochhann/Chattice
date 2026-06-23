import { FastifyReply, FastifyRequest } from "fastify";
import { MessageService } from "./message.service.js";
import { CreateMessageDTO, MessageParams, NewMessage, UpdateMessageDTO } from "./message.types.js";
import { MessageDoesNotExists } from "./message.errors.js";

export class MessageController
{
    private readonly service: MessageService;

    constructor(service: MessageService){
        this.service = service;
        this.createMessage = this.createMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    async createMessage(request: FastifyRequest<{ Body: CreateMessageDTO }>, reply: FastifyReply)
    {
        const newMessage = request.body;
        const authorId = request.user!.id;

        const response = await this.service.create(authorId, newMessage);

        return reply.status(201).send(response);
    }

    async updateMessage(request: FastifyRequest<{ Body: UpdateMessageDTO, Params: MessageParams }>, reply: FastifyReply)
    {
        const id = request.params.id;
        const message = await this.service.find(id);
        if(!message) throw new MessageDoesNotExists();

        const messageDTO = request.body;
        const response = await this.service.update(id, messageDTO);

        return reply.status(200).send(response);
    }

    async deleteMessage(request: FastifyRequest<{ Params: MessageParams }>, reply: FastifyReply)
    {
        await this.service.delete(request.params.id);
        return reply.status(204).send();
    }
}