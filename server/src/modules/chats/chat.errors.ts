import { DomainError } from "../../errors/domain.error.js";

export class ChatDoesNotExists extends DomainError
{
    constructor(message = "Requested chat doesn't exists"){ super("CHAT_DOES_NOT_EXISTS", message) }
}