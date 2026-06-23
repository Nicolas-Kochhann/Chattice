import { User, NewUser } from "../user.types.js";
import { UserRepository } from "./user.repository.js";
import { db } from "../../../db/connection.js";
import { users } from "../../../db/schema/users.js";
import { eq } from "drizzle-orm";

export class DrizzleUserRepository implements UserRepository 
{
    async findById(id: number): Promise<User|null> 
    {
        const [ result ] = await db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

        if(!result) return null;
        return result;
    }

    async findByEmail(email: string): Promise<User|null> 
    {
        const [ result ] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if(!result) return null;
        return result;
    }

    async create(user: NewUser): Promise<User>
    {
            // Destructuring because returning() function returns an array.
            const [result] = await db.insert(users).values(user).returning({ 
                id: users.id,
                name: users.name,
                email: users.email,
                tokenVersion: users.tokenVersion,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
                passwordHash: users.passwordHash
            });

            return result;
    }

}