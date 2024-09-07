
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRouteProviders } from './app/routing.module';
import { CoreProviders } from './app/utils/core.providers';
import { environment } from './environments/environment';


if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {

    providers: [
        // pass the routes from existin RouteModule
        ...CoreProviders,
        ...AppRouteProviders,
    ],
});
