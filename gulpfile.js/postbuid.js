
// after building to host, copy the index.html into host/index folder with all supported languages
// replace text $1 and so on with the right strings (en, ar...)


const gulp = require('gulp');
const rename = require('gulp-rename');
var transform = require('gulp-transform');

// TODO: this is specific, make it generic
var ngConfig = {
    index: {
        src: '../aumet.host/v2/index.html',
        dest: '../aumet.host/index',
        languages: ['en', 'ar', 'fr']
    },
    resourcekeys: {
        src: './translate/resourcekeys.json',
        dest: '../aumet.host/server'
    }

};


const _generateIndex = ngConfig.index.languages.map(language => {
    return function (cb) {
         gulp.src(ngConfig.index.src)
            .pipe(transform(function(contents, file){
                // change $lang to language
                return contents.replace(/\$lang/gim, language);
            }, { encoding: 'utf8' }))
            .pipe(rename({basename: `index.${language}`}))
            .pipe(gulp.dest(ngConfig.index.dest));
            cb();
        }
});

exports.generateIndex = gulp.parallel(..._generateIndex);

exports.copyResourceKeys = function() {
    return gulp.src(ngConfig.resourcekeys.src)
    .pipe(gulp.dest(ngConfig.resourcekeys.dest));
}

exports.all = gulp.parallel(exports.generateIndex, exports.copyResourceKeys);
