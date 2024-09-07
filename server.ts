import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import 'zone.js/dist/zone-node';
// optional import { platformFactory } from './src/app/services/config.service';
import { environment } from './src/environments/environment';

// following lines is for prerender builder to work
// export { AppServerModule } from './src/app/app.server.module';
// export { renderModule } from '@angular/platform-server';


// The Express app is exported so that it can be used by serverless Functions.
// *************************AYYASH********************/
// export the bare minimum, let nodejs take care of everything else
// export const AppEngine = ngExpressEngine({
//     bootstrap: AppServerModule,
    // optional  providers:[
    //     {
    //         provide: PLATFORM_INITIALIZER,
    //         useFactory: platformFactory,
    //         multi: true,
    //     }
    // ]
// });

if (environment.production) {
    enableProdMode();
  }



// replace leaflet with something else
const _app = () => bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(ServerModule),
        // add providers, interceptors, and all routes you want enabled on server
        ...CoreProviders,
        // pass the routes from existing Routes used for browser
        ...AppRouteProviders
    ],
});

server.engine('html', ngExpressEngine({
    bootstrap: _app
  });
