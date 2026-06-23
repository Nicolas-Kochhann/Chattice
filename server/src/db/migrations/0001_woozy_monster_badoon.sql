ALTER TABLE "messages" ALTER COLUMN "author_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "chat_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "chats_users" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "chats_users" ALTER COLUMN "chat_id" SET NOT NULL;