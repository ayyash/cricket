const gulp = require('gulp');
const inject = require('gulp-inject');

var gulpConfig = require('./config.json');
var ngConfig = {
    Sources: './src/app/components/*.html',
    Destination: './src/locale/',
    DestinationFile: 'resources.ar.ts'
};


exports.extract = function() {
    // read all what? html files only, find {{ "" | transalate:"something" }} and copy "something" with default text in resurces.ar

    var reg = /{{\s*["']([\w\d?.,!\s\(\)]+)["']\s*\|\s*translate:['"]([\w]+)['"]\s*}}/gim;
    var returnStr = '';

    return gulp
        .src(ngConfig.Destination + ngConfig.DestinationFile)
        .pipe(
            inject(gulp.src(ngConfig.Sources), {
                starttag: '// inject:resources',
                endtag: '// endinject',
                empty: true,
                transform: function(filePath, file, index, length, targetFile) {
                    // for every translate pipe found, insert a new line name: "value"
                    // before you do, check if the match already exists

                    returnStr = '';
                    var content = file.contents.toString('utf8');
                    var destination = targetFile.contents.toString('utf8');
                    var _match;
                    while ((_match = reg.exec(content))) {
                        // extract first and second match
                        if (destination.indexOf(_match[2]) < 0){

                            returnStr += `${_match[2]}: '${_match[1]}',\n`;
                        }
                    }

                    return returnStr === '' ? null : returnStr;
                }
            })
        )
        .pipe(gulp.dest(ngConfig.Destination));
};
