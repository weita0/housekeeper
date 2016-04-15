var db = require('../db/connect'),
	comment = require('../model/comment');


var insertComment = function(workid, rate, comments, tel, fn) {
	db.connect(function(db) {
		var theComment = comment(workid, rate, comments, tel);
		db.collection('comment').insertOne(theComment);
		fn();
		db.close();
	});
};

module.exports = insertComment;