var path = require("path");
var rootPath = path.normalize(__dirname + '/../');

// use this for different keys on server if any
module.exports = {
	local: {
		name: 'local',
		rootPath: rootPath,
        ssr: false

	}
	, production: {
		name: 'production',
		rootPath : rootPath,
         ssr: true
	},
	getConfig: function(){
		var env = process.env.NODE_ENV || 'local';


		return  this[env];
	}
};
