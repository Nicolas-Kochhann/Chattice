import { FastifyReply, FastifyRequest } from "fastify";
import { ChatService } from "./chat.service.js";
import { CreateChatDTO, GetMessagesParams } from "./chat.types.js";

export class ChatController {
    private readonly service: ChatService;

    constructor(service: ChatService) {
        this.service = service;
        this.createChat = this.createChat.bind(this);
        this.getChats = this.getChats.bind(this);
        this.getChatMessages = this.getChatMessages.bind(this);
    }

    async createChat(request: FastifyRequest<{ Body: CreateChatDTO }>, reply: FastifyReply) {
        // No chat groups yet.
        const claimantId = request.user!.id;
        const guestId = request.body.guest_id;

        const response = await this.service.create({}, claimantId, guestId);

        return reply.status(201).send(response);
    }

    async getChats(request: FastifyRequest, reply: FastifyReply) {
        const userId = request.user!.id;

        const response = await this.service.getChats(userId);

        return reply.status(200).send(response);
    }

    async getChatMessages(request: FastifyRequest<{ Params: GetMessagesParams }>, reply: FastifyReply) {
        const { id } = request.params;

        const response = await this.service.getChatMessages(id);

        return reply.status(200).send(response);
    }
}