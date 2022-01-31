import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { SttAppComponent } from "./stt-app.component";

@NgModule({
    declarations: [
        SttAppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [SttAppComponent],
})
export class SttAppModule {
}
