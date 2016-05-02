var db = require('../db/connect');
var age = require('../util/getAge');
var logger = require('../util/logger');
var path = require('path');

var host = 'http://139.129.133.217:3000';

var searchByType = function (type, fn) {
	db.connect(function(db) {
		var cursor = db.collection('employee').find({ 'type': type });
		var res = [];
		cursor.forEach(function (doc) {
			var imageurl = doc.imageurl;
			if (imageurl !== undefined) {
				var image = path.join(host, imageurl);
			}
			res.push({
				name: doc.name,
				workid: doc.workid,
				gender: doc.gender,
				age: age(doc.birth),
				locate: doc.locate,
				score: doc.score,
				imageurl: image
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
