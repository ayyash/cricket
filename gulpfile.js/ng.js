// TODO: here
// gulp taks to create angular component according to this set up

// var gulp = require('gulp-param')(require('gulp'), process.argv);
var options = require('minimist')(process.argv.slice(2)); // those are params passed by cmd line
var fs = require('fs');

var gulp = require('gulp');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');

var gulpConfig = require('./config.json');
var ngConfig = {
    Templates: {
        Components: __dirname + '/angulartemplates/component.template',
        FormComponents: __dirname + '/angulartemplates/component.form.template',
        Views: __dirname + '/angulartemplates/view.template',
        FormViews: __dirname + '/angulartemplates/view.form.template',
        Directives: __dirname + '/angulartemplates/directive.template',
        Pipes: __dirname + '/angulartemplates/pipe.template',
        Route: __dirname + '/angulartemplates/route.template',
        // RouteModule: './angulartemplates/routeModule.template',
        Declaration: 'CoreComponents.MajorNamePartialComponent',
        Module: __dirname + '/angulartemplates/module.template',
        Model: __dirname + '/angulartemplates/model.template',
        Service: __dirname + '/angulartemplates/service.template',
        ApiConfig: __dirname + '/angulartemplates/config.template'
    },
    Destinations: {
        Components: './src/app/components/',
        Views: './src/app/components/',
        Directives: './src/app/lib/directives/',
        Pipes: './src/app/lib/pipes/',
        // Modules: './src/app/', // root route location
        Routes: './src/app/routes/',
        // RouteFile: 'routing.module.ts',
        Models: './src/app/models/',
        Services: './src/app/services/',
        ApiConfig: './src/app/'
    },
    Core: {
        Components: './src/app/core/', // barrel
        ComponentsFile: 'components.ts',
        Services: './src/app/core/', // barrel
        ServicesFile: 'services.ts',
        CoreModule: './src/app/core/', // module
        CoreModuleFile: 'core.module.ts',
        // Libs: './src/app/core/', // barrel
        // LibFile: 'lib.ts',
        LibModule: './src/app/lib/', // module
        LibModuleFile: 'lib.module.ts',
        ApiConfigFile: './src/app/config.ts'
    }
};

var classRe = /export\s+(?:abstract )?class (\w+)/;
// TODO: remove this once  u figure out how to do it
var tempRoute = ` {
    path: '_name_', component: CoreComponents.MainLayoutComponent,
    loadChildren: () => import('_path_.module').then(m => m._Name_Module)

  },
  `;
function getClassName(file) {
    var str = file.contents.toString('utf8');
    var className = str.match(classRe);
    if (className && className.length > 1) return className[1];
    else return '';
}
function transformClass(filePath, file, isImport) {
    // for every export class /name/ generate export {{name}} from {{path}}
    // if (filePath.indexOf('module') > -1 || filePath.indexOf('_') > -1) return '';

    var className = getClassName(file);
    if (className === '') return '';

    return `${isImport ? 'import' : 'export'} { ${className} } from '${filePath.substring(
        0,
        filePath.lastIndexOf('.')
    )}';`;
}
function transformExport(filePath, file) {
    return transformClass(filePath, file, false);
}
function transformImport(filePath, file) {
    return transformClass(filePath, file, true);
}

function transformClassName(filePath, file) {
    var className = getClassName(file);
    if (className === '') return '';

    return className + ',';
}

function transformModel(filePath, file) {
    return `export * from '${filePath.substring(0, filePath.lastIndexOf('.'))}';`;
}

// inject components in components.ts
const _injectComponents = function() {
    // core components
    return gulp
        .src(ngConfig.Core.Components + ngConfig.Core.ComponentsFile)
        .pipe(
            inject(
                gulp.src([
                    ngConfig.Destinations.Components + '**/*.component.ts',
                    ngConfig.Destinations.Components + '**/*.partial.ts',
                    ngConfig.Destinations.Components + '**/*.dialog.ts',
                    '!' + ngConfig.Destinations.Components + '**/abstract/*.ts',
                    '!' + ngConfig.Destinations.Components + '**/_*.ts'
                ]),
                {
                    relative: true,
                    starttag: '// inject:components',
                    endtag: '// endinject',
                    transform: transformExport
                }
            )
        )
        .pipe(gulp.dest(ngConfig.Core.Components));
};

const _injectLibModule = function() {
    // inject classes into the lib module
    return gulp
        .src(ngConfig.Core.LibModule + ngConfig.Core.LibModuleFile)
        .pipe(
            inject(
                gulp.src([
                    ngConfig.Destinations.Directives + '**/*.directive.ts',
                    ngConfig.Destinations.Pipes + '**/*.pipe.ts',
                    '!**/_*.ts'
                ]),
                {
                    relative: true,
                    starttag: '// inject:libs',
                    endtag: '// endinject',
                    transform: transformClassName
                }
            )
        )
        .pipe(
            inject(
                gulp.src([
                    ngConfig.Destinations.Directives + '**/*.directive.ts',
                    ngConfig.Destinations.Pipes + '**/*.pipe.ts',
                    '!**/_*.ts'
                ]),
                {
                    relative: true,
                    starttag: '// inject:importlibs',
                    endtag: '// endinject',
                    addPrefix: '.',
                    transform: transformImport
                }
            )
        )
        .pipe(gulp.dest(ngConfig.Core.LibModule));
};

const _injectModels = function() {
    return gulp
        .src(ngConfig.Core.Services + ngConfig.Core.ServicesFile)
        .pipe(
            inject(gulp.src([ngConfig.Destinations.Models + '**/*.model.ts', '!**/_*.ts']), {
                relative: true,
                starttag: '// inject:models',
                endtag: '// endinject',
                transform: transformModel
            })
        )

        .pipe(gulp.dest(ngConfig.Core.Services));
};

const _injectServices = function() {
    // inect in core.module all services, guards and resolves
    // until u figure o
    return gulp
        .src(ngConfig.Core.Services + ngConfig.Core.ServicesFile)
        .pipe(
            inject(
                gulp.src([
                    ngConfig.Destinations.Services + '**/*.ts',
                    '!' + ngConfig.Destinations.Services + '**/*.abstract.ts',
                    '!' + ngConfig.Destinations.Services + '**/_*.ts'
                ]),
                {
                    relative: true,
                    starttag: '// inject:services',
                    endtag: '// endinject',
                    transform: transformExport
                }
            )
        )
        .pipe(gulp.dest(ngConfig.Core.Services));
};

// not used any more
const _injectCoreModule = function() {
    return gulp
        .src(ngConfig.Core.CoreModule + ngConfig.Core.CoreModuleFile)
        .pipe(
            inject(
                gulp.src([
                    ngConfig.Destinations.Services + '**/*.ts',
                    '!' + ngConfig.Destinations.Services + '**/*.abstract.ts',
                    '!' + ngConfig.Destinations.Services + '**/_*.ts'
                ]),
                {
                    relative: true,
                    starttag: '// inject:services',
                    endtag: '// endinject',
                    transform: transformClassName
                }
            )
        )
        .pipe(gulp.dest(ngConfig.Core.CoreModule));
};

const _createModule = function() {
    let { major, name, ispartial } = options;

    if (!major) {
        return gulp.src('.');
    }

    var majorName = major.substring(major.lastIndexOf('/') + 1);
    // if common or layouts, do not create module
    if (majorName === 'Common' || majorName === 'Layouts') {
        return gulp.src('.');
    }

    return gulp
        .src(ngConfig.Templates.Module)
        .pipe(replace('Major', majorName))
        .pipe(
            rename({
                basename: majorName.toLowerCase(),
                suffix: '.route',
                extname: '.ts'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Routes, { overwrite: false }));
};
// TODO: next version clean up the repepetive parts

// add component to a module or create a new one
const _addComponentToModule = function() {
    const { major, name, ispartial } = options;
    if (!major) {
        return gulp.src('.');
    }

    var majorName = major.substring(major.lastIndexOf('/') + 1);
    // if common or layouts, do not create module
    if (majorName === 'Common' || majorName === 'Layouts') {
        return gulp.src('.');
    }
    var route =
        fs
            .readFileSync(ngConfig.Templates.Route, 'utf8')
            .replace('major', majorName.toLowerCase())
            .replace('name', name.toLowerCase())
            .replace('Major', majorName)
            .replace('Name', name);


    var component =  ngConfig.Templates.Declaration
            .replace('Major', majorName)
            .replace('Name', name);
    if (!ispartial) component = component.replace('Partial', '');


    // place it inside the module, if // **gulpcomponent_first exists, replace with // **gulpcomponent and dont add a comma

    return (
        gulp
            .src(ngConfig.Destinations.Routes + major.toLowerCase() + '.route.ts')
            // replace route and component
            .pipe(gulpif(!ispartial, replace('// **gulproute**', ','+ route + '\n// **gulproute**')))
            .pipe(gulpif(!ispartial, replace('// **gulproute_first**', route + '\n// **gulproute**')))
            .pipe(replace('// **gulpcomponent**',  ',' + component + '\n// **gulpcomponent**' ))
            .pipe(replace('// **gulpcomponent_first**',  component + '\n// **gulpcomponent**' ))
            .pipe(gulp.dest(ngConfig.Destinations.Routes))
    );
};

const _createView = function() {
    const { major, name, ispartial, isform } = options;
    //major now is Something/Something' place in destinationviews + the path

    if (!major) {
        return gulp.src('.');
    }
    var majorName = major.substring(major.lastIndexOf('/') + 1);

    return gulp
        .src(isform ? ngConfig.Templates.FormViews : ngConfig.Templates.Views)
        .pipe(replace('Major', majorName))
        .pipe(replace('major', majorName.toLowerCase()))
        .pipe(
            rename({
                basename: name.toLowerCase(),
                suffix: ispartial ? '.partial' : '',
                extname: '.html'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Views + major.toLowerCase(), { overwrite: false}));
};

const _createComponent = function() {
    const { major, name, ispartial, isform } = options;
    if (!major) {
        return gulp.src('.');
    }
    var _partialView = '';
    var _selector = '';
    var majorName = major.substring(major.lastIndexOf('/') + 1);
    // if common, or layout dont include name
    if (majorName === 'Common' || majorName === 'Layouts') {
        majorName = '';
    }
    if (ispartial) {
        _partialView = '.partial';
        _selector = `selector: '${gulpConfig.projectName}-${majorName.toLowerCase()}-${name.toLowerCase()}',`;
    }
    return gulp
        .src(isform ? ngConfig.Templates.FormComponents : ngConfig.Templates.Components)
        .pipe(replace('Major', majorName))
        .pipe(replace('Name', name))
        .pipe(replace('major', majorName.toLowerCase()))
        .pipe(gulpif(!ispartial, replace('Partial', '')))
        .pipe(replace('viewpath', name.toLowerCase() + _partialView))
        .pipe(replace('_selector_', _selector))
        .pipe(
            rename({
                basename: name.toLowerCase(),
                suffix: ispartial ? '.partial' : '.component',
                extname: '.ts'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Components + major.toLowerCase(), {overwrite: false}));
};

const _createPipe = function() {
    const name = options.name;
    if (!name) {
        return gulp.src('.');
    }
    // TODO inject in shared.module

    return gulp
        .src(ngConfig.Templates.Pipes)
        .pipe(replace('_Name_', name))
        .pipe(replace('_name_', name.toLowerCase()))
        .pipe(
            rename({
                basename: name.toLowerCase(),
                suffix: '.pipe',
                extname: '.ts'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Pipes, {overwrite: false}));
};

const _createDirective = function() {
    const name = options.name;
    if (!name) {
        return gulp.src('.');
    }
    // TODO inject in shared.module

    return gulp
        .src(ngConfig.Templates.Directives)
        .pipe(replace('_Name_', name))
        .pipe(replace('_name_', name.toLowerCase()))
        .pipe(
            rename({
                basename: name.toLowerCase(),
                suffix: '.directive',
                extname: '.ts'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Directives, {overwrite: false}));
};

const _createModel = function() {
    const name = options.name;

    if (!name) {
        return gulp.src('.');
    }

    return gulp
        .src(ngConfig.Templates.Model)
        .pipe(replace('_Name_', name))
        .pipe(replace('_name_', name.toLowerCase()))
        .pipe(
            rename({
                basename: name.toLowerCase(),
                suffix: '.model',
                extname: '.ts'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Models, {overwrite: false}));
};

const _createService = function(){
    const name = options.name;
    // create service from template and save in services folder with name
    // then inject in services.ts
    // then inject in coremodules

    return gulp
        .src(ngConfig.Templates.Service)
        .pipe(replace('_Name_', name))
        .pipe(replace('_name_', name.toLowerCase()))
        .pipe(
            rename({
                basename: name.toLowerCase(),
                suffix: '.service',
                extname: '.ts'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Services, {overwrite: false}));
}

const _addToConfig = function(){
    // add a node to config to be used with newly created config
    const name = options.name;

    var apiconfig =
    fs
        .readFileSync(ngConfig.Templates.ApiConfig, 'utf8')
        .replace(/_name_/gim, name.toLowerCase());


    return (
        gulp
            .src(ngConfig.Core.ApiConfigFile)
            .pipe(replace('// **gulpmodel**',', '+ apiconfig + '\n// **gulpmodel**'))
            .pipe(gulp.dest(ngConfig.Destinations.ApiConfig))
    );

}


// TODO: create guard and resolve

exports.injectComponents = _injectComponents;
exports.injectServices = _injectServices; // gulp.series(_injectServices, _injectCoreModule);
exports.injectLibModule = _injectLibModule;
exports.injectModels = _injectModels;

exports.injectAll = gulp.parallel(  gulp.series(_injectModels, _injectServices), _injectComponents, _injectLibModule, );

exports.createModule = _createModule; // create a module with defualt ListComponent

exports.createComponent = gulp.series(
    gulp.parallel(
        _createView,
        _createComponent,
        _createModule
    ),
    _injectComponents,
    _addComponentToModule
);

exports.createPipe = gulp.series(_createPipe, _injectLibModule);
exports.createDirective = gulp.series(_createDirective, _injectLibModule);
exports.createModel = gulp.series(_createModel, _injectModels);
exports.createService = gulp.series(_createService, _injectServices);
exports.createFullService = gulp.series(gulp.parallel(_createModel, _createService, _addToConfig), _injectModels, _injectServices);

