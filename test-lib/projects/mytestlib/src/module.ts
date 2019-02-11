import { NgModule } from "@angular/core";

//
// NOTE: This is done this way to show what I do for my real-life libraries that have a fair amount of third party imports
// specific to a platform (e.g. angular-material for the web only) and a lot of internal declarations and providers. So rather
// than have to repeat all the declarations and providers in each module I do the following trick.
//
import { platformImports, platformSchemas } from "./module.platform";

import { MytestlibComponent } from "./testcomp/testcomp.component";

@NgModule({
    imports: platformImports,
    declarations: [MytestlibComponent],
    exports: [MytestlibComponent],
    schemas: platformSchemas
})
export class AUTestModule {}
