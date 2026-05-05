import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { chats } from '../../db/schema/chats.js';

const chatInsertSchema = createInsertSchema(chats);
const chatsSelectSchema = createSelectSchema(chats);

export const chatCreateDTOSchema = z.object({
    guest_id: z.coerce.number().positive(),
});

export type NewChat = z.infer<typeof chatInsertSchema>;
export type Chat = z.infer<typeof chatsSelectSchema>;
export type CreateChatDTO = z.infer<typeof chatCreateDTOSchema>;