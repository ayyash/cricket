const j = require('./ng');
const assets = require('./assets');
const icons = require('./icons');


exports.injectComponents = j.injectComponents;
exports.injectServices = j.injectServices;
exports.injectLib = j.injectLibModule;
exports.injectModels = j.injectModels;
exports.inject = j.injectAll;

exports.module = j.createModule;
exports.component = j.createComponent;
exports.pipe = j.createPipe;
exports.directive = j.createDirective;
exports.model = j.createModel;
exports.service = j.createService;
exports.fullService = j.createFullService;

// exports.default = watch;
exports.rawless = assets.rawless;
exports.default = assets.watch;

exports.iconset = icons.iconset;
