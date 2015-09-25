'use strict';
var favicon = require('serve-favicon'),
    express = require('express');

module.exports = function (app) {

    // Set views path, template engine and default layout
    app.set('views', __dirname + '/server/views');

    // Setting the favicon and static folder
    app.use(favicon(__dirname + '/public/assets/img/icons/favicon.ico'));

    // Adding robots and humans txt
     app.use(express.static(__dirname + '/public/assets/static'));

};
