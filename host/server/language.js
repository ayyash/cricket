
// to make language change on ssr, use globals
// set locals.lang for use through out nodejs

module.exports = function (config) {
    return function (req, res, next) {
        // check cookies for language, for html request only
        res.locals.lang = req.cookies.lang || 'en';

        // this wont work in ssr, i need to catch all paths that are not resources

        // TODO: exclude non html sources
        if (req.path.indexOf('.') > 1){
            next();
            return;
        }

        // this part is dependent on project, some projects will required language in url, some wont

        /********** URL driven language ***********
        if (req.path.indexOf('/en') === 0) {
            res.locals.lang = 'en'; // force en from url

        } else if (req.path.indexOf('/ar') === 0) {
            res.locals.lang = 'ar'; // force ar from url
        }
        // FIXME: make this more generic to all languages
        ************/


        // used in angular ssr
        // FIXME: break apart from require
        const resFile = './locale/' + res.locals.lang + '.js';
        const _resources = require(resFile).resources;

        global.resources.language = res.locals.lang;
        global.resources.keys = _resources.keys;


        // set cookie for a year
        res.cookie('lang', res.locals.lang, { expires: new Date(Date.now() + 31622444360) });

        next();

    };
}
