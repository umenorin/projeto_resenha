import { BookAnalyst } from "./bookAnalyst";

export class Book{

    constructor(
        public _id: string,
        public title: string,
        public author: string,
        public edition: string,
        public publisher: string,
        public gender: string,
        public img: string,

        public bookAnalyst: BookAnalyst[],
    ){}
}