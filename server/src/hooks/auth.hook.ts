import { FastifyPluginAsync } from "fastify";
import { AuthService } from "../modules/auth/auth.service.js";
import { DrizzleRepository } from "../modules/users/repositories/drizzle.repository.js";
import { AuthorizationFailedError } from "../modules/auth/auth.errors.js";

export const authHook: FastifyPluginAsync = async (app, options) => {

    app.addHook("onRequest", async (request, reply) => {
        const userRepository = new DrizzleRepository();
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

            reply.header('x-api-token', token);
            reply.header('x-api-toke-ttl', AuthService.TOKEN_TTL);
        } else {
            throw new AuthorizationFailedError('Refresh token not provided.')
        }
        
    });

}