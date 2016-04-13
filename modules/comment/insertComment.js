var db = require('../db/connect'),
	comment = require('../model/comment');


var insertComment = function(workid, rate, comment, username) {
	db.connect(function(db) {
		var theComment = comment(workid, rate, comment, username);
		db.collection('comment').insertOne(theComment);
	});
};
