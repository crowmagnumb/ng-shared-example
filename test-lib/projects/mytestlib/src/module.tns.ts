import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MytestlibComponent } from "./testcomp/testcomp.component";

@NgModule({
    imports: [NativeScriptCommonModule],
    declarations: [MytestlibComponent],
    exports: [MytestlibComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AUTestModule {}
