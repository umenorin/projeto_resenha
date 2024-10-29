import { Book } from "./book.model";
import { User } from "./user.model";

export class BookAnalyst{
    constructor(
        public id: string,
        public title: string,
        public content: string,
        public rating: Number,
        
        public autor: User,
        public book: Book,
    ){}
}