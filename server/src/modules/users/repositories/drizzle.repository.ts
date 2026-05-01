import { User, NewUser } from "../user.types.js";
import { UserRepository } from "./user.repository.js";
import { db } from "../../../db/connection.js";
import { users } from "../../../db/schema/users.js";

export class DrizzleRepository implements UserRepository 
{
    async findById(id: number): Promise<User|null> 
    {
        const result = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, id),
        });

        if(!result) return null;
        return result;
    }

    async findByEmail(email: string): Promise<User|null> 
    {
        const result = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });

        if(!result) return null;
        return result;
    }

    async create(user: NewUser): Promise<User|null>
    {
        try {
            // Destructuring because returning() function returns an array.
            const [result] = await db.insert(users).values(user).returning({ 
                id: users.id,
                name: users.name,
                email: users.email,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
                passwordHash: users.passwordHash
            });

            return result;
            
        } catch (error) {
            // TODO: Log to somewhere
            return null;
        }
    }

}