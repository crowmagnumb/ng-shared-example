import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MytestlibComponent } from "./testcomp/testcomp.component";

@NgModule({
    imports: [CommonModule],
    declarations: [MytestlibComponent],
    exports: [MytestlibComponent]
})
export class AUTestModule {}
