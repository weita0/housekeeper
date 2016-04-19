var db = require('../db/connect');

var searchByType = function(type, fn) {
	db.connect(function(db) {
		var cursor = db.collection('employee').find({ 'type': type });
		var res = [];
		cursor.forEach(function(doc) {
			res.push({
				name: doc.name,
				gender: doc.gender,
				age: doc.birth,
				locate: doc.locate
			});
		});
	});
}
