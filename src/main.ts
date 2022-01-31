/* eslint-disable */
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { environment } from "@env/environment";
import { hmrBootstrap } from "./hmr";
import { SttAppModule } from "./stt-app/stt-app.module";

if (environment.production) {
    enableProdMode();
}
const bootstrap = () => platformBrowserDynamic().bootstrapModule(SttAppModule);
if (environment.hmr) {
    console.log("You are in HMR mode");
    if (module["hot"]) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error("HMR is not enabled for webpack-dev-server!");
        console.log("Are you using the --hmr flag for ng serve?");
    }
} else {
    bootstrap();
}
