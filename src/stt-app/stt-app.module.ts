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
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./stt-store/state/stt-app.state";
import { EffectsModule } from "@ngrx/effects";
import { SttTimetableEffects } from "./stt-store/stt-timetable.effects";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { SttSearchComponent } from "./stt-app-components/stt-search/stt-search.component";
import { CookieService } from "ngx-cookie-service";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { SttTimePipe } from "./stt-app-components/stt-pipes/stt-time.pipe";

@NgModule({
    declarations: [
        SttAdminPanelComponent,
        SttAppComponent,
        SttHeaderComponent,
        SttLoginComponent,
        SttNotFoundComponent,
        SttSearchComponent,
        SttTimePipe,
    ],
    imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([SttTimetableEffects]),
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        ReactiveFormsModule,
        SttAppRoutingModule,
    ],
    providers: [CookieService],
    bootstrap: [SttAppComponent],
})
export class SttAppModule {
}
