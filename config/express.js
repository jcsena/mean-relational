'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
   flash = require('connect-flash'),
   helpers = require('view-helpers'),
   config = require('./config'),
   compression = require('compression'),
   logger = require('morgan'),
   cookieParser = require('cookie-parser'),
   bodyParser = require('body-parser'),
   methodOverride = require('method-override'),
   sessionMiddleware = require('./middlewares/session'),
   winston = require('./winston'),
   path = require('path'),
   assets = require('./assets'),
   modRewrite = require('connect-modrewrite');

module.exports = function(app, passport,db) {

    winston.info('NODE_ENV ',process.env.NODE_ENV);
    winston.info('Initializing Express');

    //Setting helpers
    app.set('showStackError', true);
    app.set('jsAssets',config.getJavaScriptAssetsGlobals());
    app.set('cssAssets',config.getCSSAssetsGlobals());
    app.set('assetsapp',assets);

    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.use('/bundle',  express.static(config.root + '/packages/bundle'));

    //setting static packages public folder
    config.getDirectories(config.root + '/packages').forEach(function(pack){
        app.use('/' + pack, express.static(config.root + '/packages/' + pack + '/public'));
    });

    //Setting static bower_components folder
    app.use('/bower_components',  express.static(config.root + '/bower_components'));

    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(logger('dev', { 'stream':winston.stream }));
    }

    //Set  engine and default layout
    // app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    //Enable jsonp
    app.enable('jsonp callback');

    //cookieParser should be above session
    app.use(cookieParser());

    // request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    //express session configuration
    app.use(sessionMiddleware);

    //connect flash for flash messages
    app.use(flash());

    //dynamic helpers
    app.use(helpers(config.app.name));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());


   //inject app and db to app.js all packages
   config.getGlobbedFiles('./packages/*/app.js').forEach(function (routePath) {
      require(path.resolve(routePath))(app,db);
    });

    //settig modRewrite htlm5
    app.use(modRewrite([
      '!^/api/.*|\\.html|\\.txt\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.ico|\\.gif|\\.svg|\\.eot|\\.ttf|\\.woff|\\.pdf$ / [L]'
    ]));

    // inject app to all routes packages
    config.getGlobbedFiles('./packages/**/server/routes/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });



};
