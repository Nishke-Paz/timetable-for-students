import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SttAppComponent } from "./stt-app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { SttAppRoutingModule } from "./stt-app-routing/stt-app-routing.module";
import { SttNotFoundComponent } from "./stt-app-components/stt-not-found/stt-not-found.component";
import { SttHeaderComponent } from "./stt-app-components/stt-header/stt-header.component";
import { SttLoginComponent } from "./stt-app-components/stt-login/stt-login.component";
import { SttAdminPanelComponent } from "./stt-app-components/stt-admin-panel/stt-admin-panel.component";
import { SttUserComponent } from "./stt-app-components/stt-user/stt-user.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    declarations: [
        SttAdminPanelComponent,
        SttAppComponent,
        SttHeaderComponent,
        SttLoginComponent,
        SttNotFoundComponent,
        SttUserComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        ReactiveFormsModule,
        SttAppRoutingModule,
    ],
    providers: [],
    bootstrap: [SttAppComponent],
})
export class SttAppModule {
}
