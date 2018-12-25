// TODO: here
// gulp taks to create angular component according to this set up

// var gulp = require('gulp-param')(require('gulp'), process.argv);
var options = require('minimist')(process.argv.slice(2)); // those are params passed by cmd line

var gulp = require('gulp');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');

var gulpConfig = require(__dirname + '/config.json');
var ngConfig = {
    Templates: {
        Components: __dirname + '/angulartemplates/component.template',
        Views: __dirname + '/angulartemplates/view.template',
        Directives: __dirname + '/angulartemplates/directive.template',
        Pipes: __dirname + '/angulartemplates/pipe.template',
        Route: __dirname + '/angulartemplates/route.template',
        RouteModule: __dirname + '/angulartemplates/routeModule.template',
        Module: __dirname + '/angulartemplates/module.template',
        Model: __dirname + '/angulartemplates/model.template',
        Service: __dirname + '/angulartemplates/service.template'
    },
    Destinations: {
        Components: './src/app/components/',
        Views: './src/app/components/',
        Directives: './src/app/lib/directives/',
        Pipes: './src/app/lib/pipes/',
        Modules: './src/app/', // root route location
        Routes: './src/app/routes/',
        RouteFile: 'routing.module.ts',
        Models: './src/app/models/',
        Services: './src/app/services'
    },
    Core: {
        Components: './src/app/core/', // barrel
        ComponentsFile: 'components.ts',
        Services: './src/app/core/', // barrel
        ServicesFile: 'services.ts',
        CoreModule: './src/app/core/', // module
        CoreModuleFile: 'core.module.ts',
        Libs: './src/app/core/', // barrel
        LibFile: 'lib.ts',
        LibModule: './src/app/core/', // module
        LibModuleFile: 'lib.module.ts'
    }
};

var classRe = /export (?:abstract )?class (\w+)/;
// TODO: remove this once  u figure out how to do it
var tempRoute = ` {
    path: '_name_', component: CoreComponents.MainLayoutComponent,
    loadChildren: '_path_.module#_Name_Module'
  },
  `;

function transformCore(filePath, file) {
    // for every export class /name/ generate export {{name}} from {{path}}
    // if (filePath.indexOf('module') > -1 || filePath.indexOf('_') > -1) return '';

    var str = file.contents.toString('utf8');
    var className = str.match(classRe);
    if (className && className.length > 1) className = className[1];
    else return '';

    return `export { ${className} } from '${filePath.substring(0, filePath.lastIndexOf('.'))}';`;
}

function transformService(filePath, file) {
    var str = file.contents.toString('utf8');
    var className = str.match(classRe);
    if (className.length > 1) className = className[1];
    else return '';

    return className + ',';
}

function transformModel(filePath, file) {
    return `export * from '${filePath.substring(0, filePath.lastIndexOf('.'))}';`;
}

const injectcore = function() {
    // core components
    return gulp
        .src(ngConfig.Core.Components + ngConfig.Core.ComponentsFile)
        .pipe(
            inject(
                gulp.src([
                    ngConfig.Destinations.Components + '**/*.component.ts',
                    ngConfig.Destinations.Components + '**/*.partial.ts',
                    // ngConfig.Destinations.Components + '**/*.directive.ts',
                    // ngConfig.Destinations.Components + '**/*.pipe.ts',
                    '!' + ngConfig.Destinations.Components + '**/abstract/*.ts',
                    '!' + ngConfig.Destinations.Components + '**/_*.ts'
                ]),
                {
                    relative: true,
                    starttag: '// inject:components',
                    endtag: '// endinject',
                    transform: transformCore
                }
            )
        )

        .pipe(gulp.dest(ngConfig.Core.Components));
};


const injectlib = function() {
    // call inject module here, in gulp 4 i will make them serial, oh please go for 4 soon
    injectlibmodule();

    return gulp
        .src(ngConfig.Core.Libs + ngConfig.Core.LibFile)
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
                    transform: transformCore
                }
            )
        )

        .pipe(gulp.dest(ngConfig.Core.Libs));
};

const injectlibmodule = function() {
    // inject classes into the lib module
    return gulp
        .src(ngConfig.Core.LibModule + ngConfig.Core.LibModuleFile)
        .pipe(
            inject(
                gulp.src([
                    ngConfig.Destinations.Directives + '**/*.directive.ts',
                    ngConfig.Destinations.Pipes + '**/*.pipe.ts',
                    '!' + ngConfig.Destinations.Components + '**/_*.ts'
                ]),
                {
                    relative: true,
                    starttag: '// inject:libs',
                    endtag: '// endinject',
                    transform: transformService
                }
            )
        )
        .pipe(gulp.dest(ngConfig.Core.LibModule));
};

const injectmodels = function() {
    return gulp
        .src(ngConfig.Core.Services + ngConfig.Core.ServicesFile)
        .pipe(
            inject(
                gulp.src([
                    ngConfig.Destinations.Models + '**/*.model.ts',
                    '!' + ngConfig.Destinations.Components + '**/_*.ts'
                ]),
                {
                    relative: true,
                    starttag: '// inject:models',
                    endtag: '// endinject',
                    transform: transformModel
                }
            )
        )

        .pipe(gulp.dest(ngConfig.Core.Services));
};
const injectservices = function() {
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
                    transform: transformCore
                }
            )
        )
        .pipe(gulp.dest(ngConfig.Core.Services));
};

const injectcoremodule = function() {
    // injsect services content in core.module
    // first inject in services.ts
    injectservices();

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
                    transform: transformService
                }
            )
        )
        .pipe(gulp.dest(ngConfig.Core.CoreModule));
};



gulp.task('addRoute', function() {
    // still not used
    const modulePath = options.moduleName;
    var moduleName = modulePath.substring(modulePath.lastIndexOf('/') + 1);

    var newRoute = tempRoute
        .replace(/_name_/g, moduleName.toLowerCase())
        .replace('_path_', ngConfig.Destinations.Components + modulePath.toLowerCase())
        .replace('_Name_', moduleName);

    //TODO: find out which route file to add this route
    // add to root routing.module
    return gulp
        .src(ngConfig.Destinations.Modules + ngConfig.Destinations.RouteFile)
        .pipe(replace('// **gulproute**', '// **gulproute**\n' + newRoute))
        .pipe(gulp.dest(ngConfig.Destinations.Modules));
});


gulp.task('ngroute', function() {
    const modulePath = options.modulePath;
    var moduleName = modulePath.substring(modulePath.lastIndexOf('/') + 1);

    return gulp
        .src(ngConfig.Templates.RouteModule)
        .pipe(replace('_Name_', moduleName))
        .pipe(
            rename({
                basename: moduleName.toLowerCase(),
                suffix: '.route',
                extname: '.ts'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Components + modulePath.toLowerCase()));
});

gulp.task('ngmodule',  gulp.series('ngroute', function() {
    const modulePath = options.modulePath;
    var moduleName = modulePath.substring(modulePath.lastIndexOf('/') + 1);

    return gulp
        .src(ngConfig.Templates.Module)
        .pipe(replace('_Name_', moduleName))
        .pipe(replace('_name_', moduleName.toLowerCase()))
        .pipe(
            rename({
                basename: moduleName.toLowerCase(),
                suffix: '.module',
                extname: '.ts'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Components + modulePath.toLowerCase()));
}));

gulp.task('ngview', function() {
    const {major, name, ispartial} = options;
    //major now is Something/Something' place in destinationviews + the path

    if (!major) {
        return gulp.src('.');
    }

    return gulp
        .src(ngConfig.Templates.Views)
        .pipe(
            rename({
                basename: name.toLowerCase(),
                suffix: ispartial ? '.partial' : '',
                extname: '.html'
            })
        )
        .pipe(gulp.dest(ngConfig.Destinations.Views + major.toLowerCase()));
});

gulp.task('ngcomponent', gulp.series('ngview', function() {
    // copy template to app/components/folder/name.component.s
    const {major, name, ispartial} = options;
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
        _selector = `selector: '${gulpConfig.projectName}-${name.toLowerCase()}',`;
    }
    return gulp
        .src(ngConfig.Templates.Components)
        .pipe(replace('Major', majorName))
        .pipe(replace('Name', name))
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
        .pipe(gulp.dest(ngConfig.Destinations.Components + major.toLowerCase()));
}));

gulp.task('ngpipe', function() {
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
        .pipe(gulp.dest(ngConfig.Destinations.Pipes));
});

gulp.task('ngdirective', function() {
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
        .pipe(gulp.dest(ngConfig.Destinations.Directives));
});

// create model
gulp.task('ngmodel', function() {
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
        .pipe(gulp.dest(ngConfig.Destinations.Models));
});

// service, create, inject in barrels, add instnace to core

gulp.task('ngservice', function() {
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
        .pipe(gulp.dest(ngConfig.Destinations.Services));
});

// create component
gulp.task('component', gulp.series('ngcomponent', function() {
    // inject all components in core, and all services and models in services
    return injectcore();
}));

// create pipe
gulp.task('pipe', gulp.series('ngpipe', function() {
    return injectlib();
}));
// create directive
gulp.task('directive', gulp.series('ngdirective', function() {
    return injectlib();
}));

// create model
gulp.task('model', gulp.series('ngmodel', function() {
    return injectmodels();
}));

// create service
gulp.task('service', gulp.series('ngservice', function() {
    return injectcoremodule();
}));

// TODO: create guard and resolve

gulp.task('injectcore', injectcore);
gulp.task('injectlib', injectlib);

gulp.task('injectmodels', injectmodels);
gulp.task('injectcoremodule', injectcoremodule);

gulp.task('injectall', gulp.parallel('injectcore', 'injectlib', 'injectmodels', 'injectcoremodule'));
