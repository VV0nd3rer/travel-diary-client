export class UploadedImage {
    pending:boolean = false;
    status:string = 'init';

    constructor(public path:string, public file:File) {
    }

}