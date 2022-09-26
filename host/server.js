var express = require('express');

/*********************Configuration***********/
const config = require('./server/config');

// for ssr to run, define global
if (config.ssr) {

   global.window = undefined;


   // override localStorage on server side
   global.localStorage = {
      getItem: function (key) {
         // return dummy object to override certain server side
         return null;

      },
      setItem: function (key, value, expiresin) {
         if (expiresin === void 0) { expiresin = 0; }
      },
      clear: function () {
      },
      removeItem: function (key) {
      },
      length: 0
   };
   global._debug = function (o, message, type) {
      if (config.env === 'local') {
         console.log(message, o);
      }
   };
   global._attn = function (o, message) {
      if (config.env === 'local') {
         console.log(message, o);
      }
   }
}

/******* EXPRESS *******/
var app = express();

require('./server/express')(app);

var country = require('./server/country');
app.use(country(config));

// for language, even if single, always set to default
var language = require('./server/language');
app.use(language(config));

// for ssr use
app.use(function (req, res, next) {

   // also save serverUrl to use with local interceptor
   let proto = req.protocol;
   let port = '';
   if (req.headers) {
      if (req.headers['x-forwarded-proto']) {
         proto = req.headers['x-forwarded-proto'].toString();
      }

   }
   res.locals.serverUrl = `${proto}://${req.get('host')}${port}`;
   next();
});

// serve the right router
const _routes = (config.ssr ? '-ssr' : '') + (config.urlBased ? '-url' : '') + (config.prepared ? '-pre' : '');
if (config.withAppBaseHref) {
    // special case with appbase href used in client

    require('./server/routes-base' + (config.ssr ? '-ssr' : ''))(app, config);
} else {

    require('./server/routes' + _routes)(app, config);
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
   var err = new Error('404');
   err['statusCode'] = 404;

   next();
});

app.use(function (err, req, res, next) {
   res.status(err.status || 500);
   console.log(err.stack);
   err.internalMessage = err.message; // the server error to display in debug mode
   res.send(err);
});

/*************** listening  ***************/

var port = process.env.PORT || 1212;

app.listen(port, function (err) {
   // console.log('started to listen to port: ' + port);
   if (err) {
      console.log(err);
      return;
   }
});
