export class ResourceExistsException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ResourceExistsException";
        Error.captureStackTrace(this, this.constructor);
    }
}