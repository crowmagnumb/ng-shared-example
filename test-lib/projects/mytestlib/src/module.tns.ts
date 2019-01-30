import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { MytestlibComponent } from "./testcomp/testcomp.component";

@NgModule({
    imports: [CommonModule, NativeScriptModule],
    declarations: [MytestlibComponent],
    exports: [MytestlibComponent]
})
export class AUTestModule {}
