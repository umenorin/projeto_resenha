import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [RouterLink,RouterLinkActive],
    templateUrl:'./page-not-found.components.html',
    styles : 
    `
        div{
            background-color: #f8f9fa;
            text-align: cecnter;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h1{
            color: red;
            font-size: 50px;
            margin-top: 50px;
        }
        p{
            font-size: 24px;
        }
        img{
            width: 100px;
            margin-top: 20px;
        }

    `
})
export class PageNotFoundComponent{}