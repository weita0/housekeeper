/**
 * Establish connection to database
 */
var db = db || {},
	dbinfo = require('./dbinfo');
	MongoClient = require('mongodb').MongoClient,
	logger = require('../util/logger');

db.connect = function(fn) {
	var info = dbinfo(),
		dbuser = info.dbuser,
		dbpassword = info.dbpassword,
		uri = info.uri;
	if(dbuser === '' && dbpassword === '') {
		var url = 'mongodb://' + uri;
	} else {
		var url = 'mongodb://' + dbuser + ':' + dbpassword + '@' + uri;
	}
	
	logger.info('url =>', url)
	MongoClient.connect(url, function(err, db) {
		if (err) 
			throw err;
		logger.debug('Connection has established. ');
		fn(db);
	});
};

module.exports = db;