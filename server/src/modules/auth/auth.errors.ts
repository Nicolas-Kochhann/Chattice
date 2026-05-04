import { DomainError } from "../../errors/domain.error.js";

export class EmailAlreadyExistsError extends DomainError
{
    constructor(){ super("EMAIL_ALREADY_EXISTS", 'Email already exists') }
}