/**
 * list all comments of a employee
 */
var db = require('../db/connect'),
	user = require('../user/user');
	
module.exports = function(workid, fn) {
	db.connect(function(db) {
		var cursor = db.collection('comment').find({'workid': workid});
		var comments = [];
		cursor.forEach(function(doc) {
			if(doc !== null) {
				comments.push({
					tel: doc.tel,
					comment: doc.comment,
					rate: doc.rate
				});
			}
		}, function(err) {
			if(err)
				throw err;
			var idx = 0;
			comments.forEach(function(comment) {
				user.findUsername(db, comment.tel, function(username) {
					comment.username = username;
					if(++idx === comments.length) {
						fn(comments);
						db.close();
					}
				});
			});
		});
	});
};