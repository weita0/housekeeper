var db = require('../db/connect');
var age = require('../util/getAge');

var searchByType = function(type, fn) {
	db.connect(function(db) {
		var cursor = db.collection('employee').find({ 'type': type });
		var res = [];
		cursor.forEach(function(doc) {
			res.push({
				name: doc.name,
				gender: doc.gender,
				age: age(doc.birth),
				locate: doc.locate
			});
		}, function (err) {
			if (err) {
				throw err;
			}
			fn({message: 'true', employees: res});
			db.close();
			logger.debug('Connection closed');
		});
	});
}

module.exports = searchByType;
