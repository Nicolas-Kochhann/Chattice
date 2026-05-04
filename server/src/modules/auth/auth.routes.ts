import { AuthController } from "./auth.controller.js";
import { FastifyPluginAsync } from "fastify";
import { userCreateDTOSchema, userResponseDTOSchema } from "../users/user.types.js";
import { errorResponseSchema } from "../../errors/error.schema.js";
import { AuthService } from "./auth.service.js";
import { DrizzleRepository } from "../users/repositories/drizzle.repository.js";

export const authRoutes: FastifyPluginAsync = async (app, options) => {

    const authController = new AuthController(new AuthService(new DrizzleRepository()));

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
}