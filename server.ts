import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';


import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), './views');
  const indexHtml = join(distFolder, 'indexview.html');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);


  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));


  // All regular routes use the Universal engine
  server.get('*', (req, res) => {

    // if request headers have x-forwarded-host value use it, else use request.get('host')

    let proto = req.protocol;
    let host = req.get('host');

    if (req.headers) {
      if (req.headers['x-forwarded-proto']) {
        proto = req.headers['x-forwarded-proto'].toString();
      }
      if (req.headers['x-forwarded-host']) {
        host = req.headers['x-forwarded-host'].toString();
      }
    }

    // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');

    res.render(indexHtml, {
      req,
      res,
      providers: [
        { provide: 'serverUrl', useValue: `${proto}://${host}` }]
    });
  });


  return server;
}

export * from './src/main.server';
