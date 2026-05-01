import { CreateUserDTO } from "../users/user.types.js";
import { AuthService } from "./auth.service.js";
import { DrizzleRepository } from "../users/repositories/drizzle.repository.js";
import { FastifyReply, FastifyRequest } from "fastify";

const authService = new AuthService(new DrizzleRepository());

export async function registerNewUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply)
{
    const userDTO: CreateUserDTO = request.body;

    const result = await authService.registryUser(userDTO);

    if(!result){
        return reply.status(500).send({
            message: "Sorry! Something went wrong!"
        });
    }

    const response = {
        user: {
            id: result.id,
            name: result.name,
            email: result.email,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    }

    return reply.status(201).send(response);

}