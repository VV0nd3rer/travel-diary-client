import {User} from "./user";
export class Post {
    public postId:number;
    public title:string;
    public description:string;
    public text:string;
    public author: User;
}
