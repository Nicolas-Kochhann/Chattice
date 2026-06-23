import { User, NewUser } from "../user.types.js";

export interface UserRepository
{
    findById(id: number): Promise<User|null>;
    findByEmail(email: string): Promise<User|null>;
    create(user: NewUser): Promise<User>;
    //update(user: UpdateUserDTO): Promise<User|null>;
    //delete(id: number): Promise<void>;
}