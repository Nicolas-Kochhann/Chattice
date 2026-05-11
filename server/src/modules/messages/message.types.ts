import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { messages } from '../../db/schema/messages.js';

const messageInsertSchema = createInsertSchema(messages);
const messageSelectSchema = createSelectSchema(messages);

export type NewMessage = z.infer<typeof messageInsertSchema>;
export type Message = z.infer<typeof messageSelectSchema>;