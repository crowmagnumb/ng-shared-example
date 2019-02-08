import { Component } from "@angular/core";

import { AbstractMytestlibComponent } from "./testcomp.component.abstract";

@Component({
    selector: "testcomp",
    templateUrl: "./testcomp.component.html"
})
export class MytestlibComponent extends AbstractMytestlibComponent {
    tapped() {
        console.log("I've been tapped");
    }
}
