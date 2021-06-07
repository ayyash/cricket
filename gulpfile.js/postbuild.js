
// after building to host, copy the index.html into host/index folder with all supported languages
// replace text $1 and so on with the right strings (en, ar...)


const gulp = require('gulp');
const rename = require('gulp-rename');
const transform = require('gulp-transform');


const gulpConfig = require('./config.json');

var _config = {
    index: {
        src: gulpConfig.hostUrl + 'client/placeholder.html',
        dest: gulpConfig.hostUrl + 'index' // destination of multiple index files
    },
    locales: {
        Sources: './src/locale/*.js', // locale files to be transfered for ssr purposes
        Destination: gulpConfig.hostUrl + 'server/locale/'
    }

};


const _generateIndex = gulpConfig.languages.map(language => {
    return function (cb) {
         gulp.src(_config.index.src)
            .pipe(transform(function(contents, file){
                // change $lang to language
                // also if urlbased language is applied on server, replace <base href="/"> with <base href="/language/">
                if (gulpConfig.isUrlBased){
                    contents = contents.replace('<base href="/">', `<base href="/${language}/">`);
                }
                return contents.replace(/\$lang/gim, language);

            }, { encoding: 'utf8' }))
            .pipe(rename({basename: `index.${language}`}))
            .pipe(gulp.dest(_config.index.dest));
            cb();
        }
});


exports.generateIndex = gulp.parallel(..._generateIndex);



exports.locales = function () {

    // from src/local/*.js append exports.resources = resources; to end of file then copy to host
     return  gulp.src(_config.locales.Sources)
         .pipe(transform(function (contents, file) {
             return contents +'\n\nexports.resources = resources;';
         }, {encoding: 'utf8'}))
         .pipe(gulp.dest(_config.locales.Destination));
 }


 exports.postbuild = gulp.parallel(exports.generateIndex, exports.locales);
