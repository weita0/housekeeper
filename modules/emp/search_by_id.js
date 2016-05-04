var db = require('../db/connect'),
	logger = require('../util/logger'),
	age = require('../util/getAge'),
	user = require('../user/user');
	
// Step1: connect to db;
// Step2: db.collection('employee').find({"workid": workid});
// Step3: cursor.forEach()
// Step4: db.collection('comment').find({"workid": workid});
// Step5: cursor.forEach()
// Step6:
var host = 'http://139.129.133.217:3000';

var search_by_id = function (workid, fn) {
	var emp = {};
	emp.comments = [];
	db.connect(function (db) {
		var cursor = db.collection('employee').find({'workid': workid});
		cursor.toArray(function (err, res) {
			if (err) {
				throw err;
			} else if (res.length) {
				// do something...
				var len = res.length;
				if (res[0].score === undefined) {
					var score = 0;
				} else {
					var score = res[0].score;
				}
				
				if(res[0].imageurl !== undefined) {
					var imageurl = res[0].imageurl.replace('\\', '\/');
				}
				
				if (imageurl !== undefined) {
					var image = host + '\/' + imageurl;
				}
				
				if (len === 1) {
					emp.workid = res[0].workid,
					emp.name = res[0].name,
					emp.gender = res[0].gender,
					emp.score = String(score),
					emp.age = age(res[0].birth),
					emp.imageurl = image,
					emp.locate = res[0].locate,
					emp.type = res[0].type;
				}
			} else {
				logger.info('No data response..');
			}
			var cursor2 = db.collection('comment').find({'workid': workid});
			cursor2.toArray(function (err, res) {
				if (err) {
					throw err;
				} else if (res.length) {
					var len = res.length;
					for (var i = 0; i < len; i += 1) {
						var tem = res[i];
						emp.comments.push({
							rate: tem.rate,
							comment: tem.comment,
							username: tem.tel
						});
					}
				} else {
					logger.info('no comment data..');
				}
				
				db.close();
				logger.debug('Connection closed.');
				fn(emp);
			});
			
		});
	});
	
};


module.exports = search_by_id;