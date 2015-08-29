/**
 * Module dependencies.
 */
var express = require('express');
   flash = require('connect-flash'),
   helpers = require('view-helpers'),
   config = require('./config'),
   compression = require('compression'),
   favicon = require('serve-favicon'),
   logger = require('morgan'),
   cookieParser = require('cookie-parser'),
   bodyParser = require('body-parser'),
   methodOverride = require('method-override'),
   sessionMiddleware = require('./middlewares/session'),
   winston = require('./winston'),
   path = require('path'),
   assets = require('./assets'),
   modRewrite = require('connect-modrewrite');

module.exports = function(app, passport) {

    winston.info('NODE_ENV ',process.env.NODE_ENV);
    winston.info('Initializing Express');

    app.set('showStackError', true);

    app.set('jsAssets',config.getJavaScriptAssetsGlobals());
    app.set('cssAssets',config.getCSSAssetsGlobals());

    app.set('assetsapp',assets);

    // app.locals.files = config.getFilesGlobals();
    //console.log(app.locals.files);
    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));


    //Setting the fav icon and static folder
    app.use(favicon(config.root + '/packages/system/public/img/icons/favicon.ico'));
    app.use(express.static(config.root + '/packages'));
    app.use('/bower_components',  express.static(config.root + '/bower_components'));

    app.use(modRewrite([
      '!^/api/.*|\\.html|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.ico|\\.gif|\\.svg|\\.eot|\\.ttf|\\.woff|\\.pdf$ / [L]'
    ]));

    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(logger('dev', { "stream": winston.stream }));
    }

    //Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    //Enable jsonp
    app.enable("jsonp callback");

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


    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
      require(path.resolve(routePath))(app);
    });

    //Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        //Treat as 404
        if (~err.message.indexOf('not found')) return next();

        //Log it
        console.error(err.stack);

        //Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    //Assume 404 since no middleware responded
    app.use(function(err, req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
};
