import {Resources} from "./resources";
export class Page <T> {
    public resources: Resources<T>
    public totalPages: any;
    public totalElements: any;
    public currentPage: any;
    public pageSize: any;
}