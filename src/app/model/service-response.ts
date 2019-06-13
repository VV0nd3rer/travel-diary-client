export class ServiceResponse <T> {
    public responseCode: string;
    public responseMessage: string;
    public responseObject: T;
}