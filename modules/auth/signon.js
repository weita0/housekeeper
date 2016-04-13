/**
 * create new user in database:
 * 1. check if phone number of the user already exists in db.
 * 2. if yes, return false.
 * 3. if no, insert data to db and return true.
 */
var connect = require('../db/connect'),
	encrypt = require('../security/encrypt'),
	user = require('../model/user');

module.exports = function(username, password, tel, fn) {
	connect.connect(function(db) {
		var cursor = db.collection('user').find({"tel": tel});
		var exist = false;
		cursor.forEach(function(doc) {
			if(doc !== null) {
				exist = true;
			} 
		}, function(err) {
			if(err)
				throw err;
			if(!exist) {
				db.collection('user').insertOne({
					"username": username,
					"password": encrypt(password),
					"tel": tel
				});
				fn(user(username, tel));
			} else {
				fn({});
			}
			db.close();
		});
	});
};