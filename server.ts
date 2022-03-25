import 'zone.js/dist/zone-node';
import './src/app/core/logger.service';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode, PLATFORM_INITIALIZER } from '@angular/core';
// optional import { platformFactory } from './src/app/services/config.service';
import { environment } from './src/environments/environment';
import { AppServerModule } from './src/app/app.server.module';

// The Express app is exported so that it can be used by serverless Functions.
// *************************AYYASH********************/
// export the bare minimum, let nodejs take care of everything else
export const AppEngine = ngExpressEngine({
    bootstrap: AppServerModule,
    // optional  providers:[
    //     {
    //         provide: PLATFORM_INITIALIZER,
    //         useFactory: platformFactory,
    //         multi: true,
    //     }
    // ]
});

if (environment.production) {
    enableProdMode();
  }


