import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AUTestModule } from "../../projects/mytestlib/src/public_api";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, AUTestModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
