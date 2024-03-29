
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic()
    // or
    // platformBrowserDynamic([
    //     {
    //         provide: PLATFORM_INITIALIZER,
    //         useFactory: platformFactory,
    //         multi: true,
    //     }
    // ])
    .bootstrapModule(AppBrowserModule)
    .catch(err => console.log(err));
});
