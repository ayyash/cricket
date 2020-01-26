const gulp = require('gulp');

var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var transform = require('gulp-transform');

var gulpConfig = require('./config.json');

var rtl = require('./rtl.js');
var critical = require('./critical.js');


// use less/sh.imports.less to create a less file of all ui* and media*, then generate src/css/sh.css
const rawless = function() {

    return gulp
        .src(gulpConfig.srcUrl + 'less/sh.imports.less')
        .pipe(
            inject(gulp.src(gulpConfig.srcUrl + 'less/ui.*.less', { read: false }), {
                starttag: '// inject:uiless',
                endtag: '// endinject',
                relative: true
            })
        )
        .pipe(
            inject(gulp.src(gulpConfig.srcUrl + 'less/media.*.less', { read: false }), {
                starttag: '// inject:medialess',
                endtag: '// endinject'
            })
        )
        .pipe(rename({ basename: 'all' }))
        .pipe(gulp.dest(gulpConfig.srcUrl + 'less/'))
        .pipe(
            less({
                paths: [gulpConfig.shutUrl + 'less/']
            })
        )
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(
            autoprefixer()
        )
        .pipe(rename({ basename: gulpConfig.projectName }))
        .pipe(gulp.dest(gulpConfig.distUrl + 'css'))
        .on('error', console.error.bind(console));
};

// use sh.rtl.imports.less, concat to sh.imports.less, the inject rtl.*.less to generate src/css/sh.rtl.css
const rawlessRtl = function(){

    return gulp.src([gulpConfig.srcUrl + 'less/all.less', gulpConfig.srcUrl + 'less/sh.rtl.imports.less'])
        .pipe(concat('all.rtl.less', { newLine: '' }))
        .pipe(
            inject(gulp.src(gulpConfig.srcUrl + 'less/rtl.*.less', { read: false }), {
                starttag: '// inject:rtlless',
                endtag: '// endinject',
                relative: true
            })
        )
        .pipe(
            gulp.dest(gulpConfig.srcUrl + 'less/')
        )
        .pipe(
            less({
                paths: [gulpConfig.shutUrl + 'less/']
            })
        )
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(
            autoprefixer()
        )
        .pipe(rename({ basename: gulpConfig.projectName, suffix: '.rtl' }))
        .pipe(gulp.dest(gulpConfig.distUrl + 'css'))
        .on('error', console.error.bind(console));
};

// mirror /src/css/sh.rtl.css
const rawMirror = gulp.series(rawlessRtl, function(){

    return gulp.src(`${gulpConfig.distUrl}css/${gulpConfig.projectName}.rtl.css`)
       .pipe(transform(function(contents, file){
           return rtl.MirrorText(contents);
       }, { encoding: 'utf8' }))
       .pipe(gulp.dest(gulpConfig.distUrl + 'css/'));
 });

  // remove non critical from sh.css and in sh.general.css
  const rawNonCritical  = gulp.series(rawless, function() {
    return gulp.src(`${gulpConfig.distUrl}css/${gulpConfig.projectName}.css`)
        .pipe(transform(function(contents, file) {
            return critical.CriticalText(contents, false);
        }, {encoding: 'utf8'}))
        // rename to .general
        .pipe(rename({ basename: gulpConfig.projectName, suffix: '.general' }))
        .pipe(gulp.dest(gulpConfig.distUrl + 'css/'));
        // .on('error', console.error.bind(console));
 });

 const rawCritical = function() {
    return gulp.src(`${gulpConfig.distUrl}css/${gulpConfig.projectName}.css`)
        .pipe(transform(function(contents, file) {
            return critical.CriticalText(contents, true);
        }, {encoding: 'utf8'}))
        // rename to .general
        .pipe(rename({ basename: gulpConfig.projectName, suffix: '.critical' }))
        .pipe(gulp.dest(gulpConfig.distUrl + 'css/'));
        // .on('error', console.error.bind(console));
 };

 const rawNonCriticalRtl = gulp.series(rawMirror, function() {
    return gulp.src(`${gulpConfig.distUrl}css/${gulpConfig.projectName}.rtl.css`)
        .pipe(transform(function(contents, file) {
            return critical.CriticalText(contents, false);
        }, {encoding: 'utf8'}))
        // rename to .general
        .pipe(rename({ basename: gulpConfig.projectName, suffix: '.general.rtl' }))
        .pipe(gulp.dest(gulpConfig.distUrl + 'css/'));
        // .on('error', console.error.bind(console));
 });

 const rawCriticalRtl = function() {
    return gulp.src(`${gulpConfig.distUrl}css/${gulpConfig.projectName}.rtl.css`)
        .pipe(transform(function(contents, file) {
            return critical.CriticalText(contents, true);
        }, {encoding: 'utf8'}))
        // rename to .general
        .pipe(rename({ basename: gulpConfig.projectName, suffix: '.critical.rtl' }))
        .pipe(gulp.dest(gulpConfig.distUrl + 'css/'))
        .on('error', console.error.bind(console));
 };



if (gulpConfig.isRtl){
    exports.rawless = gulp.series(rawless, rawMirror);
    exports.watch = function() {
        // place code for your default task here
        gulp.watch('**/less/(sh|ui|rtl){1}\.*.less',  { ignoreInitial: false }, gulp.series(rawless, rawMirror));

    }
    exports.critical =  gulp.series(rawNonCritical, rawCritical, rawNonCriticalRtl, rawCriticalRtl);


} else {

    exports.rawless = rawless;

    exports.watch = function() {
        // place code for your default task here
        gulp.watch('**/less/(sh|ui){1}\.*.less',  { ignoreInitial: false }, rawless);

    }
    exports.critical =  gulp.series(rawNonCritical, rawCritical);

}

