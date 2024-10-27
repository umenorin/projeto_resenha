import { BookAnalyst } from "./bookAnalyst";

export class Book{

    constructor(
        public title: string,
        public author: string,
        public edition: string,
        public publisher: string,
        public gender: string,

        public bookAnalyst: BookAnalyst[],
    ){}
}