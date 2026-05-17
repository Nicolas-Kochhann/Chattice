import { DomainError } from "../../errors/domain.error.js";

export class EmailAlreadyExistsError extends DomainError
{
    constructor(message = 'Email already exists.'){ super("EMAIL_ALREADY_EXISTS", message) }
}

export class InvalidCredentialsError extends DomainError
{
    constructor(message = 'Invalid credentials.'){ super('INVALID_CREDENTIALS', message) }
}

export class TokenExpiredError extends DomainError
{
    constructor(message = 'Token has expired.'){ super('TOKEN_EXPIRED', message) }
}

export class TokenInvalidError extends DomainError
{
    constructor(message = 'Token is malformed or invalid.'){ super('TOKEN_IS_INVALID', message) }
}

export class TokenNotBeforeError extends DomainError
{
    constructor(message = 'Token is not yet valid.'){ super('TOKEN_NOT_BEFORE_ERROR', message) }
}

export class AuthorizationFailedError extends DomainError
{
    constructor(message = 'Occurs an error on request authorization.'){ super('AUTHORIZATION_FAILED', message) }
}