import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateUserDTO, LoginUserDTO, NewUser, User } from "../users/user.types.js";
import { UserRepository } from "../users/repositories/user.repository.js";
import { EmailAlreadyExistsError, InvalidCredentialsError } from "./auth.errors.js";
import { env } from "../../env.js";

export class AuthService
{
    constructor(private repository: UserRepository){}


    async registryUser({ name, email, password }: CreateUserDTO)
    {
        const user = await this.repository.findByEmail(email);

        if(user) throw new EmailAlreadyExistsError();

        const newUser = { name: name, email: email, passwordHash: hashSync(password, 10)}

        const responseUser = await this.repository.create(newUser)

        const token = this.generateToken(responseUser!);
        const refreshToken = this.generateRefreshToken(responseUser!);

        return { user: responseUser, token: token, refreshToken: refreshToken };
    }
    

    async authenticate({ email, password }: LoginUserDTO)
    {
        const user = await this.repository.findByEmail(email);

        if(!user || !compareSync(password, user.passwordHash)){
            throw new InvalidCredentialsError();
        }

        const token = this.generateToken(user);
        const refreshToken = this.generateRefreshToken(user);

        return { user: user, token: token, refreshToken: refreshToken };
    }


    private generateToken({ id, name, email }: User): string
    {
        return jwt.sign({ sub: id, name: name, email: email }, env.API_KEY, { expiresIn: 60 * 15 });
    }


    private generateRefreshToken({ id, tokenVersion }: User): string
    {
        return jwt.sign({ sub: id, version: tokenVersion }, env.API_REFRESH_KEY, { algorithm: "HS512", expiresIn: 60 * 60 * 24 * 15 });
    }

}
