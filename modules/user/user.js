/**
 * operations of user
 */
var user = user || {};

//find username by tel provided as parameter
user.findUsername = function(db, tel, fn) {
	var cursor = db.collection('user').find({'tel': tel});
	var username = '';
	cursor.forEach(function(doc) {
		if(doc !== null) {
			//console.log('username =>', doc.username);
			username = doc.username;
			fn(username);
		}
	});
};

module.exports = user;