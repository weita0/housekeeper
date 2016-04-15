var db = require('../modules/db/connect');

db.connect(function(db) {
	console.log(db);
	db.close();
});