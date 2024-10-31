import { BookAnalyst } from "./bookAnalyst";

export class User{
    constructor(
        public name:string,
        public email:string,
        public password:string,
        public bookAnalyst: BookAnalyst[],
        public id?:string
    ){}
}