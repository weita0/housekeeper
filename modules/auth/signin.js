/**
 * Account authentication	
 */
var connect = require('../db/connect'),
	encrypt = require('../security/encrypt'),
	user = require('../model/user')
	logger = require('../util/logger');

module.exports = function(username, password, fn) {
	connect.connect(function(db) {
		var cursor = db.collection('user').find({"username": username, "password": encrypt(password) });
		var userinfo = {};
		var success = false;
		cursor.forEach(function(doc) {
			if(doc != null) {
				success = true;
				console.log(doc);
				userinfo = user(doc.username, doc.tel);
			}
		}, function(err) {
			if(err)
				throw err;
			fn({message: success, user: userinfo});
			console.log('Connection closed.');
			db.close();	
		});
	});
};