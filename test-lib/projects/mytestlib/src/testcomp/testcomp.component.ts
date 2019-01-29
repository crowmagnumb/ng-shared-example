import { Component, OnInit } from "@angular/core";

@Component({
    selector: "testcomp",
    templateUrl: "./testcomp.component.html",
    styles: []
})
export class MytestlibComponent implements OnInit {
    title: string = "mytestlib will fix the world FOREVER!";

    constructor() {}

    ngOnInit() {}
}
