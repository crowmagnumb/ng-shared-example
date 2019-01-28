import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AUTestModule } from "@myscope/mytestlib";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, AUTestModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
