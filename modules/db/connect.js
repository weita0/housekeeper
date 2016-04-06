/**
 * Establish connection to database
 */
var db = db || {},
	MongoClient = require('mongodb').MongoClient;


//var hostname = 'ds023108.mlab.com:23108/housekeeper';

db.connect = function(dbuser, dbpassword, hostname, fn) {
	var url = 'mongodb://' + dbuser + ':' + dbpassword + '@' + hostname;
	MongoClient.connect(url, function(err, db) {
		if (err) 
			throw err;
		fn(db);
		db.close();
	});
};

module.exports = db;