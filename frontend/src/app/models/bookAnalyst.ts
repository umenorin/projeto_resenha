import { Book } from "./book.model";
import { User } from "./user.model";

export class BookAnalyst{
    constructor(
        public title: string,
        public content: string,
        public rating: Number,
        
        public autor: User,
        public book: string,
        
        public _id?: string,
    ){}
}