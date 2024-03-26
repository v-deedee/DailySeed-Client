export class HttpError extends Error {
    constructor(msg, code, status = 500) {
        super(msg);
        this.status = status;
        this.code = code;
    }
}
