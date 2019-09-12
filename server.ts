
// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();


// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/en/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)]
    })
);


app.set('view engine', 'html');
app.set('views', join(process.cwd(), 'en'));

// Server static files from /browser
app.get('*.*', express.static(join(process.cwd(), 'en')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    // you can change url and dod, see this to recreate document with ur own template
    // https://github.com/angular/universal/blob/master/modules/express-engine/src/main.ts
    // const url = res.locals.domain;
    res.render('index', { req, res });
});
exports.app = app;
