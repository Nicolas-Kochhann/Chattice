import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../modules/auth/auth.service.js";
import { DrizzleUserRepository } from "../modules/users/repositories/drizzle.repository.js";
import { AuthorizationFailedError } from "../modules/auth/auth.errors.js";

export async function authHook(request: FastifyRequest, reply: FastifyReply)
{
        const userRepository = new DrizzleUserRepository();
        const authService = new AuthService(userRepository);

        if(request.headers.authorization) {
            const decoded = authService.verifyToken(request.headers.authorization.split(' ')[1]);
            request.user = { 
                id: Number(decoded.sub), 
                name: decoded.name, 
                email: decoded.email 
            }
        } else if (request.headers['x-refresh-token']){
            const decoded = authService.verifyRefreshToken(request.headers['x-refresh-token'] as string);

            const user = await userRepository.findById(Number(decoded.sub));
            if(!user) throw new AuthorizationFailedError("Refresh token subscriber doesn't exist.");

            const token = authService.generateToken(user);

            request.user = { id: user.id, name: user.name, email: user.email }

            reply.header('x-api-token', token);
            reply.header('x-api-token-ttl', AuthService.TOKEN_TTL);
        } else {
            throw new AuthorizationFailedError('Refresh token not provided.')
        }
}