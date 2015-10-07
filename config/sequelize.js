'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('lodash');
var config    = require('./config');
var winston   = require('./winston');
var db        = {};


var models = module.exports = {
  Sequelize: Sequelize,
  init: init
};


function init(callback){

  winston.info('Initializing Sequelize...');

  // create your instance of sequelize
  var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
      host: config.db.host,
      port: config.db.port,
      dialect: 'mysql',
      storage: config.db.storage,
      logging: config.enableSequelizeLog ? winston.verbose : false,
      timezone : config.timezone,
      define: {
          timestamps: true,
          freezeTableName: true,
          underscored: true
      }
  });

  // loop through all files in models directory ignoring hidden files and this file


    config.getDirectories(config.root + '/packages').forEach(function(pack){
      var pt = config.root + '/packages/' + pack + '/server/models';
        if(fs.existsSync(pt)){
              readdirSync(pt);
        }
    });


  // invoke associations on each of the models
  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
      db[modelName].options.associate(db);
    }
  });

  // Synchronizing any model changes with database.
  // WARNING: this will DROP your database everytime you re-run your application
  sequelize
    .sync({force: config.forceSequelizeSync})
    .then(function(){
          winston.info('Database '+(config.forceSequelizeSync?'*DROPPED* and ':'')+ 'synchronized');
          models.sequelize = sequelize;
          _.extend(models,db);
          callback();
      }).catch(function(err){
          winston.error('An error occured: %j',err);
      });

  //function create models

  function readdirSync(route){

    fs.readdirSync(route)
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
      })
      // import model files and save model names
      .forEach(function(file) {
        winston.info('Loading model file ' + file);
        var model = sequelize.import(path.join(route, file));
        db[model.name] = model;
      });
  }
}
