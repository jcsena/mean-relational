'use strict';

var _ = require('lodash'),
  glob = require('glob'),
	fs = require('fs'),
  path = require('path');

// Load app configuration

// _.assign combines the two objects into a bigger object.
module.exports = _.assign(
	// configuration variables that will be the same across all environments
    require(__dirname + '/../config/env/all.js'),
    // configuration variables that are environment specific
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {}
);

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {

    var files = glob.sync(globPatterns);

    	if (removeRoot) {
    		files = files.map(function(file) {
          if(typeof removeRoot === 'object'){
            removeRoot.forEach(function(remp){
              file = file.replace(remp, '');
            });
            return file;
          }
    			return file.replace(removeRoot, '');
    		});
    	}

    	output = _.union(output, files);

		}
	}

	return output;
};


/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
	var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'packages/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}

	return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
	var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'packages/');
	return output;
};

module.exports.getJavaScriptAssetsGlobals = function() {
    var ext = process.env.NODE_ENV === 'production' ? 'min.js' : 'js';
      var output = this.getGlobbedFiles([ './packages/**/public/**/*.'+ext], ['./packages','/public']);

      return _.sortBy(output, function(n) { return n.split('/').length;});

};

module.exports.getCSSAssetsGlobals = function(){
  var output = this.getGlobbedFiles(['./packages/**/public/**/*.css'],['./packages','/public']);
  return output;
};

module.exports.getDirectories = function(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
};
