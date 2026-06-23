import { compareSync, hashSync } from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CreateUserDTO, LoginUserDTO, NewUser, User } from "../users/user.types.js";
import { UserRepository } from "../users/repositories/user.repository.js";
import { EmailAlreadyExistsError, InvalidCredentialsError, TokenExpiredError, TokenInvalidError, TokenNotBeforeError } from "./auth.errors.js";
import { env } from "../../env.js";

export class AuthService
{
    public static TOKEN_TTL = 60 * 15;
    public static REFRESH_TOKEN_TTL = 60 * 60 * 24 * 7;

    constructor(private repository: UserRepository){}

    async registryUser({ name, email, password }: CreateUserDTO)
    {
        const user = await this.repository.findByEmail(email);

        if(user) throw new EmailAlreadyExistsError();

        const newUser = { name: name, email: email, passwordHash: hashSync(password, 10)}

        const responseUser = await this.repository.create(newUser)

        const token = this.generateToken(responseUser);
        const refreshToken = this.generateRefreshToken(responseUser);

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


    generateToken({ id, name, email }: User): string
    {
        return jwt.sign({ sub: id, name: name, email: email }, env.API_KEY, { expiresIn: AuthService.TOKEN_TTL });
    }


    private generateRefreshToken({ id, tokenVersion }: User): string
    {
        return jwt.sign({ sub: id, version: tokenVersion }, env.API_REFRESH_KEY, { algorithm: "HS512", expiresIn: AuthService.REFRESH_TOKEN_TTL });
    }


    public verifyToken(token: string): JwtPayload
    {
        try {
            return jwt.verify(token, env.API_KEY) as JwtPayload;
        } catch (err: any) {
            if(err.name === 'TokenExpiredError') throw new TokenExpiredError();
            else if(err.name === 'NotBeforeError') throw new TokenNotBeforeError();
            else throw new TokenInvalidError();
        }
    }


    public verifyRefreshToken(refreshToken: string): JwtPayload
    {
        try {
            return jwt.verify(refreshToken, env.API_REFRESH_KEY) as JwtPayload;
        } catch (err: any) {
            if(err.name === 'TokenExpiredError') throw new TokenExpiredError();
            else if(err.name = 'NotBeforeError') throw new TokenNotBeforeError();
            else throw new TokenInvalidError();
        }
    }

}
