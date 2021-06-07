var express = require('express');

global.WebSocket = require('ws');
global.XMLHttpRequest = require('xhr2');

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
    }
};
global._debug = function (o, message, type) {
    if (type === 'e' || type === 'f' || type === 'ssr') {
        console.log(message, o);

    }
};
global._attn = function (o, message) {
    // do nothing
    // console.log(message, o);
}

// to make language change on ssr, use globals
// FIXME: to make it unique per project may be i should include all languages instad of rely on cookie?
// relying on cookie is coupling it with client side resources, unable to use reference of keys, always resources.keys, explicity
global.resources = {
    language: 'en',
    country: 'JO',
    keys: { }
};

/*********************Configuration***********/
var config = require('./server/config').getConfig();

/******* EXPRESS *******/
var app = express();

require('./server/express')(app);

var country = require('./server/country');
app.use(country(config));

// for language, even if single, always set to default
var language = require('./server/language');
app.use(language(config));

// for ssr
app.use(function(req, res, next){

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

// default, change this to match need
// require('./server/routes')(app, config);
// require('./server/routes-url')(app, config);
// require('./server/routes-ssr')(app, config);
require('./server/routes-ssr-url')(app, config);

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
