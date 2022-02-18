import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SttNotFoundComponent } from "../stt-app-components/stt-not-found/stt-not-found.component";
import { SttLoginComponent } from "../stt-app-components/stt-login/stt-login.component";
import { SttAdminPanelComponent } from "../stt-app-components/stt-admin-panel/stt-admin-panel.component";
import { SttAuthResolver } from "../stt-resolvers/stt-auth.resolver";
import { SttSearchComponent } from "../stt-app-components/stt-search/stt-search.component";
import { SttLogoutResolver } from "../stt-resolvers/stt-logout.resolver";


const routes: Routes = [
    { path: "", redirectTo: "search", pathMatch: "full" },
    { path: "search", component: SttSearchComponent },
    { path: "login", component: SttLoginComponent, resolve: { data: SttLogoutResolver } },
    { path: "logout", redirectTo: "login", pathMatch: "full" },
    { path: "admin", component: SttAdminPanelComponent, resolve: { data: SttAuthResolver } },
    { path: "**", component: SttNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SttAppRoutingModule {}
