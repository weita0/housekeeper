var db = require('../db/connect'),
	logger = require('../util/logger'),
	age = require('../util/getAge'),
	user = require('../user/user');

var search_by_id = function (workid, fn) {
	// not only employee information needed, but comments of the employee needed
	var emp = {};
	emp.comments = [];
	db.connect(function (db) {
		var cursor = db.collection('employee').find({"workid": workid});
		cursor.forEach(function (doc) {
			if (doc.score === undefined) {
				var score = 0;
			} else {
				var score = doc.score;
			}
			if (doc) {
				emp.workid = doc.workid,
				emp.name = doc.name,
				emp.gender = doc.gender,
				emp.score = String(score),
				emp.age = age(doc.birth),
				emp.imageurl = doc.imageurl,
				emp.locate = doc.locate,
				emp.type = doc.type
			}
			logger.info('1 =>', emp);
		}, function (err) {
			if (err) {
				throw err;
			}
			var cursor2 = db.collection('comment').find({"workid": workid});
			var amount = 0;
			var flag = 0;
			var isNull = true;
			cursor2.forEach(function (doc) {
				if(doc) {
					amount++;
					var tel = doc.tel;
					user.findUsername(db, tel, function(username) {
						emp.comments.push({
							rate: doc.rate,
							comment: doc.comment,
							username: username
						});
						flag++;
						if(flag === amount && !isNull) {
							db.close();
							fn(emp);
						}
					});			
				} 
			});
			
			if (amount === flag && amount ===0 && flag === 0 && isNull) {
				db.close();
				fn(emp);
			}
		});
	});
};

module.exports = search_by_id;