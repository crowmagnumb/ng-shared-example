import { AbstractMytestlibComponent } from "./testcomp.component.abstract";

export class MytestlibComponent extends AbstractMytestlibComponent {
    tapped() {
        console.log("I've been tapped");
    }
}
