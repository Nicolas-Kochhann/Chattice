import { User, ResponseUserDTO } from "./user.types.js";

export function createUserResponseDTO(user: User): ResponseUserDTO {
    return { 
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}