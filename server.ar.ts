

// workaround for https://github.com/angular/angular-cli/issues/9975
const arlocal = require('@angular/common/locales/ar').default;
registerLocaleData(arlocal, 'ar');
// end workaround

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
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/ar/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { registerLocaleData } from '@angular/common';

app.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)]
    })
);

app.set('view engine', 'html');
app.set('views', join(process.cwd(), 'ar'));

// TODO: implement data requests securely
// app.get('/api/*', (req, res) => {
//     res.status(404).send('data requests are not supported');
// });

// Server static files from /browser
app.get('*.*', express.static(join(process.cwd(), 'ar')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    // const url = res.locals.domain;
    res.render('index.rtl.html', { req, res });
});

exports.app = app;
