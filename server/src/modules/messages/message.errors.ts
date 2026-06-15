import { DomainError } from "../../errors/domain.error.js";

export class MessageDoesNotExists extends DomainError
{
    constructor(message = "Requested message doesn't exists"){ super("MESSAGE_DOES_NOT_EXISTS", message) }
}