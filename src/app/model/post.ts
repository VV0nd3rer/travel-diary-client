import {User} from "./user";
import {Sight} from "./sight";
export class Post {
    public postId:number;
    public updatedAt: string;
    public title:string;
    public description:string;
    public previewImageUrl:string;
    public text:string;
    public author: User;
    public sight: Sight;
}
