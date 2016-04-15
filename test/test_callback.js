var db = require('../modules/db/connect');

db.connect(function(db) {
	var cursor = db.collection('comment').find({'workid': 'j7112044'});
	cursor.forEach(function(doc) {
		if(doc !== null) {
			console.log(doc);
		} else {
			console.log('nothing found');
		}
	}, function() {
		db.close();
	});
});