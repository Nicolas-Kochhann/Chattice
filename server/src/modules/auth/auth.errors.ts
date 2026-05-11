import { DomainError } from "../../errors/domain.error.js";

export class EmailAlreadyExistsError extends DomainError
{
    constructor(){ super("EMAIL_ALREADY_EXISTS", 'Email already exists.') }
}

export class InvalidCredentialsError extends DomainError
{
    constructor(){ super('INVALID_CREDENTIALS', 'Invalid credentials.') }
}