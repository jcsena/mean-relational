
'use strict';
/**
 * Module dependencies.
 */
var express     = require('express');
var cluster = require('cluster');
var env             = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config          = require('./config/config');
var db              = require('./config/sequelize');
var passport        = require('./config/passport');
var winston         = require('./config/winston');
var port = process.env.PORT || config.port;



if(env === 'development'){
  return createApp();
}

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

    // As workers come up.
    cluster.on('listening', function(worker, address) {
      console.log('A worker with #'+worker.id+' is now connected to ' + address.address + ':' + address.port);
    });

    // Count requestes
    Object.keys(cluster.workers).forEach(function(id) {
      cluster.workers[id].on('message', function(){
        console.log('message');
      });
    });

// Code to run if we're in a worker process
} else {
  createApp();
}

function createApp(){

//Initialize database models
  db.init(function(){
    var app = express();

    //Initialize Express
    require('./config/express')(app, passport, db);

    app.listen(port);
    winston.info('Express app started on port ' + port);

  });
}
