import {User} from "./user";
import {Sight} from "./sight";
export class Post {
    public postId:number;
    public title:string;
    public description:string;
    public text:string;
    public author: User;
    public sight: Sight;
}
