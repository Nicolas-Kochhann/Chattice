import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { messages } from '../../db/schema/messages.js';

export const messageInsertSchema = createInsertSchema(messages);
export const messageSelectSchema = createSelectSchema(messages);

export const createMessageDTOSchema = messageInsertSchema.omit({
    authorId: true
})

export const updateMessageDTOSchema = z.object({
    id: z.coerce.number().nonnegative(),
    text: z.string().optional()
});

export const messageParamsSchema = z.object({
    id: z.coerce.number().nonnegative()
});

export type NewMessage = z.infer<typeof messageInsertSchema>;
export type Message = z.infer<typeof messageSelectSchema>;
export type CreateMessageDTO = z.infer<typeof createMessageDTOSchema>;
export type UpdateMessageDTO = z.infer<typeof updateMessageDTOSchema>;
export type MessageParams = z.infer<typeof messageParamsSchema>;