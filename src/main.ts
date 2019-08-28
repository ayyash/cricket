
import './app/core/common';
import './app/core/logger.service';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

// this failed! could not freely use the config from window without injection
// fetch('_local/config.json')
// .then((response: Response) => response.json())
// .then(data => {
//     window['_config'] = _config = data;
//     _attn(_config, 'x');
//     platformBrowserDynamic()
//     .bootstrapModule(AppBrowserModule)
//     .catch(err => console.log(err));
// });

// wait until server has finished caching
document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic()
    .bootstrapModule(AppBrowserModule)
    .catch(err => console.log(err));
});
