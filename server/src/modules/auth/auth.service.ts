import { CreateUserDTO, LoginUserDTO, NewUser, User } from "../users/user.types.js";
import { UserRepository } from "../users/repositories/user.repository.js";
import { compareSync, hashSync } from "bcrypt";
import { EmailAlreadyExistsError } from "./auth.errors.js";

export class AuthService
{
    constructor(private repository: UserRepository){}

    async registryUser({ name, email, password }: CreateUserDTO)
    {
        const user = await this.repository.findByEmail(email);

        if(user) throw new EmailAlreadyExistsError();

        const newUser = { name: name, email: email, passwordHash: hashSync(password, 10)}

        const responseUser = await this.repository.create(newUser);

        // TODO: token = generateToken(user);
        // Return { responseUser, token };

        return responseUser;
    }
    
    async authenticate({ email, password }: LoginUserDTO)
    {
        const user = await this.repository.findByEmail(email);

        if(!user || !compareSync(password, user.passwordHash)){
            return null;
        }

        // TODO: token = generateToken(user);
        // return { user, token };

        return user;
    }
}