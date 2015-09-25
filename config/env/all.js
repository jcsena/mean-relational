var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
    forceSequelizeSync: process.env.FORCE_DB_SYNC==='true',
    enableSequelizeLog: true,
    timezone : '-05:00' ,
    expressSessionSecret: '$u234r$ecr13t$e$$ionKey123$$para$amto$2' // replace with your own
};
