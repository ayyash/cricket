// remove file if not going to use less
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
//var wrap = require('gulp-wrap');
var replace = require('gulp-replace');
var del = require('del');
var config = require(__dirname+ '/config.json');

gulp.task('default', ['rawless'], function () {
    // Watch .sass files
    gulp.watch([config.srcUrl + 'less/*.less'], ['rawless']);

});


gulp.task('rawless', function () {
    //imports file is important in case end user does not want to use gulp

    return gulp.src(config.srcUrl + 'less/sh.imports.less')
        .pipe(
        inject(
            gulp.src(config.srcUrl + 'less/ui.*.less', { read: false }),
            { starttag: '// inject:uiless', endtag: '// endinject', relative: true }
        )
        )
        .pipe(
        inject(
            gulp.src(config.srcUrl + 'less/media.*.less', { read: false }),
            { starttag: '// inject:medialess', endtag: '// endinject', relative: true }
        )
        )
        .pipe(concat('all.less', { newLine: '' }))
        .pipe(gulp.dest(config.srcUrl + 'less/'))
        .pipe(less(
            {modifyVars: 
                {'@shut-url': '"'+config.shutUrl + 'less/"',}
            })
        )
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(rename({ basename: config.projectName }))
        .pipe(gulp.dest(config.stageUrl + 'assets/css/'));

        

});


// TODO: place copies of mockup assets to stage
gulp.task('resources',function(){
    // clean images and fonts first

    return gulp.src([config.srcUrl + 'fonts/*', 
                    config.srcUrl + 'images/*'], {base: config.srcUrl})
            .pipe(gulp.dest(config.stageUrl + 'assets/'));

});




var liIconStr = "";
gulp.task('cssicons', function () {

    var returnStr = "";
    // different str 

    return gulp.src(config.srcUrl + 'less/sh.icons.less')
        .pipe(inject(
            gulp.src(config.srcUrl + 'dummy/variables.less'),
            {
                starttag: '// inject:icons', endtag: '// endinject',
                transform: function (filePath, file) {
                    // for ever @icon-arrow-all: "\e900"; generate @icon-arrow-all: "\e900";    .icon(icon-arrow-all, @icon-arrow-all);
                    var lines = file.contents.toString('utf8').split('\n');
                    lines.forEach(function (value) {
                        if (value.indexOf('@icon-') > -1) {
                            // add to the line icon(something, icon);
                            name = value.split(":")[0];
                            value += "	.icon({0},{1});\r\n"
                                .replace("{0}", name.substring(1))
                                .replace("{1}", name);

                            returnStr += value;

                            liIconStr += '<li><span class="symbol {0}">{1}</span></li>'
                                .replace("{0}", name.substring(1))
                                .replace("{1}", name);
                        }
                    })
                    return returnStr;
                }
            }
        ))
        .pipe(gulp.dest(config.srcUrl + 'less/'));



});
gulp.task('iconset', ['cssicons'], function () {

    return gulp.src(config.srcUrl + 'dummy/iconset.html')
        .pipe(inject(
            gulp.src(config.srcUrl + 'dummy/variables.less', { read: false }),
            {
                starttag: '<!-- inject:icons -->', endtag: '<!-- endinject -->',
                transform: function (filePath, file) {
                    //just inject text as is
                    return liIconStr;
                }
            }
        ))
        .pipe(gulp.dest(config.srcUrl + 'dummy/'));
});