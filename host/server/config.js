var path = require("path");
var rootPath = path.normalize(__dirname + '/../');

// use this for different keys on server if any
// ssr and urlbased used to switch between different flavors of cricket server

const languages = ['en']; // populate languages supported, for ssr and urlbased
module.exports = {
    local: {
        name: 'local',
        rootPath: rootPath,
        ssr: false,
        urlBased: false,
        languages
    }
    , production: {
        name: 'production',
        rootPath: rootPath,
        ssr: false,
        urlBased: false,
        languages
    },
    getConfig: function () {
        var env = process.env.NODE_ENV || 'local';


        return this[env];
    }
};
