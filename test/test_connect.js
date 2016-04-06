var db = require('../modules/db/connect');

var dbuser = 'weitao',
	dbpassword = 'weitao',
	hostname = 'ds023108.mlab.com:23108/housekeeper';

db.connect(dbuser, dbpassword, hostname, function(db) {
	console.log(db);
});