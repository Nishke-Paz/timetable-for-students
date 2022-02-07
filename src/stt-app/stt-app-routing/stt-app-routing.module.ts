import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SttNotFoundComponent } from "../stt-app-components/stt-not-found/stt-not-found.component";
import { SttLoginComponent } from "../stt-app-components/stt-login/stt-login.component";
import { SttAdminPanelComponent } from "../stt-app-components/stt-admin-panel/stt-admin-panel.component";
import { SttUserComponent } from "../stt-app-components/stt-user/stt-user.component";
import { SttAuthResolver } from "../stt-resolvers/stt-auth.resolver";


const routes: Routes = [
    { path: "", component: SttUserComponent },
    { path: "login", component: SttLoginComponent },
    { path: "admin", component: SttAdminPanelComponent, resolve: { data: SttAuthResolver } },
    { path: "**", component: SttNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SttAppRoutingModule {}
