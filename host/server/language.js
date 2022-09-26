// to make language change on ssr, use globals

module.exports = function (config) {
   return function (req, res, next) {

      // check cookies for language, for html request only
      res.locals.lang = req.cookies[config.langCookieName] || 'en';

      // TODO: exclude non html sources, for now exclude all resources with extension
      if (req.path.indexOf('.') > 1) {
         next();
         return;
      }

      // if urlbased (also multilingual) derive language from url
      res.locals.lang = config.languages.find(n => n === req.path.split('/')[1]) || res.locals.lang;

      if (config.ssr) {

         require(config.getLangPath(res.locals.lang));

         // reassign global.cr.resources
         global.cr.resources = global.cr[res.locals.lang];

      }

      // set cookie for a year
      config.saveLangCookie(res, res.locals.lang);

      next();

   };
}
