/**
 * Account authentication	
 */
var connect = require('../db/connect'),
	encrypt = require('../security/encrypt'),
	user = require('../model/user');

module.exports = function(username, password, fn) {
	connect.connect(function(db) {
		var cursor = db.collection('user').find({"username": username, "password": encrypt(password) });
		var pass = false;
		var userinfo = {};
		cursor.forEach(function(doc) {
			if(doc != null) {
				console.log(doc);
				//pass = true;
				userinfo = user(doc.username, doc.tel);
			}
		}, function(err) {
			if(err)
				throw err;
			console.log('pass =>', pass);
			fn(userinfo);
			console.log('connection closed.');
			db.close();	
		});
	});
};