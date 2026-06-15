import { AuthController } from "./auth.controller.js";
import { FastifyPluginAsync } from "fastify";
import { userCreateDTOSchema, userLoginDTOSchema, userResponseDTOSchema } from "../users/user.types.js";
import { errorResponseSchema } from "../../errors/error.schema.js";
import { AuthService } from "./auth.service.js";
import { DrizzleUserRepository } from "../users/repositories/drizzle.repository.js";

export const authRoutes: FastifyPluginAsync = async (app, options) => {

    const authController = new AuthController(new AuthService(new DrizzleUserRepository()));

    const registerSchema = {
        body: userCreateDTOSchema,
        response: {
            /*
            201: {
                user: userResponseDTOSchema
            },
            */
            // 409: errorResponseSchema,
            // 500: errorResponseSchema
        }
    }

    app.post('/register', { schema: registerSchema }, authController.registerNewUser);
    
    const loginSchema = {
        body: userLoginDTOSchema,
        response: { 
            // TODO: Response Schema
        }
    }

    app.post('/login', { schema: loginSchema }, authController.loginUser);
    
}