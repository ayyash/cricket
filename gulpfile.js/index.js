const j = require('./ng');
const assets = require('./assets');
const icons = require('./icons');
const translate = require('./translate');
const postbuild = require('./postbuild');

exports.injectComponents = j.injectComponents;
exports.injectServices = j.injectServices;
exports.injectLib = j.injectLibModule;
exports.injectModels = j.injectModels;
exports.inject = j.injectAll;

exports.routemodule = j.createRouteModule;
exports.component = j.createComponent;
exports.pipe = j.createPipe;
exports.directive = j.createDirective;
exports.model = j.createModel;
exports.service = j.createService;
exports.fullService = j.createFullService;

// exports.default = watch;
exports.rawless = assets.rawless;
exports.critical = assets.critical; // create src/css/sh.general.css and sh.critical.css and
exports.default = assets.watch;

// create icons from mockup dummy files
exports.iconset = icons.iconset;
// to prepare icons from remote folder
exports.prepicons = icons.prepicons;
// to do both
exports.createicons = icons.createicons;

// extract all translation pipes in resources.ar.ts to be ready for transation
// this is done once, redoing will overwrite existing translations
exports.extract = translate.extract;


// copy locales to server for ssr
exports.locales = postbuild.locales;
// generate index files
exports.generateIndex = postbuild.generateIndex;

// post build both:
exports.postbuild = postbuild.postbuild;

