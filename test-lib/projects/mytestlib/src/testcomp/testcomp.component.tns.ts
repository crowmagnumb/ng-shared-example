import { AbstractMytestlibComponent } from "./testcomp.component.abstract";
import { alert } from "tns-core-modules/ui/dialogs";

export class MytestlibComponent extends AbstractMytestlibComponent {
    tapped() {
        let options = {
            title: "You pushed",
            message: "You pushed the button.",
            okButtonText: "OK"
        };

        alert(options).then(() => {
            console.log("They pushed the button.");
        });
    }
}
