const j = require('./ng');

// function watch(cb) {
//     // place code for your default task here
//     gulp.watch('**/less/*.less', ['rawless']);

//     // Watch .js files
//     cb();
// }


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
