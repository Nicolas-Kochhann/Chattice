import { DomainError } from "../../errors/domain.error.js";

export class EmailAlreadyExistsError extends DomainError
{
    constructor(){ super(409, 'Email already exists') }
}