import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../../db/schema/users.js";

const userSelectSchema = createSelectSchema(users);

const userInsertSchema = createInsertSchema(users).omit({
    createdAt: true,
    updatedAt: true
});

export const userResponseDTOSchema = userSelectSchema.omit({
    passwordHash: true
})

export const userCreateDTOSchema = z.object({
    name: z.string().max(255).min(3),
    email: z.email(),
    password: z.string().min(6).max(500)
})

export const userLoginDTOSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

export const userUpdateDTOSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional()
});

export type NewUser = z.infer<typeof userInsertSchema>
export type User = z.infer<typeof userSelectSchema>;
export type ResponseUserDTO = z.infer<typeof userResponseDTOSchema>;
export type CreateUserDTO = z.infer<typeof userCreateDTOSchema>;
export type LoginUserDTO = z.infer<typeof userLoginDTOSchema>;
export type UpdateUserDTO = z.infer<typeof userUpdateDTOSchema>;