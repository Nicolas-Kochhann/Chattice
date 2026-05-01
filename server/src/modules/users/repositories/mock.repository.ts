import { User, NewUser } from "../user.types.js";
import { UserRepository } from "./user.repository.js";

export class MockRepository implements UserRepository {
    private users: User[] = [];
    private i = 1;

    async findById(id: number): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;
    }

    async create(user: NewUser): Promise<User | null> {
        const newUser = { ...user, id: this.i++, createdAt: new Date(), updatedAt: new Date() }; // Generate a unique ID and set timestamps
        this.users.push(newUser);
        return newUser;
    }
}