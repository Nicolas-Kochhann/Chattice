import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { array, z } from 'zod';
import { chats } from '../../db/schema/chats.js';
import { userSelectSchema } from '../users/user.types.js';
import { messageSelectSchema } from '../messages/message.types.js';

const chatInsertSchema = createInsertSchema(chats);
const chatsSelectSchema = createSelectSchema(chats).extend({
    users: array(userSelectSchema).nullable().optional(),
    lastMessage: messageSelectSchema.nullable().optional()
});

export const chatCreateDTOSchema = z.object({
    guest_id: z.coerce.number().positive()
});

export type NewChat = z.infer<typeof chatInsertSchema>;
export type Chat = z.infer<typeof chatsSelectSchema>;
export type CreateChatDTO = z.infer<typeof chatCreateDTOSchema>;
