var db = require('../modules/db/connect'),
	dbinfo = require('../modules/db/dbinfo')();

var dbuser = dbinfo.dbuser,
	dbpassword = dbinfo.dbpassword,
	hostname = dbinfo.uri;

db.connect(dbuser, dbpassword, hostname, function(db) {
	console.log(db);
});