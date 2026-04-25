import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../../db/schema/users.js";

const userSelectSchema = createSelectSchema(users).omit({ passwordHash: true});

const userInsertSchema = createInsertSchema(users).extend({
    password: z.string().min(6)
});

const userUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional()
});

export type User = z.infer<typeof userSelectSchema>;
export type CreateUserDTO = z.infer<typeof userInsertSchema>;
export type UpdateUserDTO = z.infer<typeof userUpdateSchema>;