export class DomainError extends Error
{
    constructor(public code: number, message: string){ super(message) }
}