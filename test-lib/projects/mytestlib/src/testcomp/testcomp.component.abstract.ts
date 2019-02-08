import { Component } from "@angular/core";

@Component({
    selector: "testcomp",
    templateUrl: "./testcomp.component.html",
    styles: []
})
export abstract class AbstractMytestlibComponent {
    title: string = "mytestlib will fix the world FOREVER!";
    buttonText: string = "Push Me";

    abstract tapped();
}
