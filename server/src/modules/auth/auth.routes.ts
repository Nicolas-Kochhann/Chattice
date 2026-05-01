import { registerNewUser } from "./auth.controller.js";
import { FastifyPluginAsync } from "fastify";
import { userCreateDTOSchema, userResponseDTOSchema } from "../users/user.types.js";
import { errorResponseSchema } from "../../errors/error.schema.js";

export const authRoutes: FastifyPluginAsync = async (app, options) => {

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

    app.post('/register', { schema: registerSchema }, registerNewUser);
}