import { CreateUserDTO, LoginUserDTO } from "../users/user.types.js";
import { createUserResponseDTO } from "../users/user.mapper.js"
import { AuthService } from "./auth.service.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class AuthController {
  private readonly authService: AuthService;

  constructor(service: AuthService) {
    this.authService = service;
    this.registerNewUser = this.registerNewUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  async registerNewUser(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) 
  {
    const userDTO: CreateUserDTO = request.body;

    const { user, token, refreshToken } = await this.authService.registryUser(userDTO);

    if (!user || !token || !refreshToken) {
      return reply.status(500).send({
        message: "Sorry! Something went wrong!",
      });
    }

    const response = {
      user: createUserResponseDTO(user),
    };

    reply.setCookie('api_token', token, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    });
  
    reply.setCookie('refresh_token', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    })

    return reply.status(201).send(response);
  }

  
  async loginUser(request: FastifyRequest<{ Body: LoginUserDTO }>, reply: FastifyReply)
  {
    const userDTO = request.body;

    const { user, token, refreshToken } = await this.authService.authenticate(userDTO);

    if(!user || !token || !refreshToken){
      return reply.status(500).send({
        message: 'Sorry! Something went wrong!',
      });
    }

    const response = {
      user: createUserResponseDTO(user),
    };

    reply.setCookie('api_token', token, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    });
  
    reply.setCookie('refresh_token', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    })

    return reply.status(200).send(response);
  }
}