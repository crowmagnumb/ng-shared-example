import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { MytestlibComponent } from "./testcomp/testcomp.component";

@NgModule({
    declarations: [MytestlibComponent],
    exports: [MytestlibComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AUTestModule {}
