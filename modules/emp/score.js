/* 
Calculate the average score of each employee, 
supposed to update every day
*/
var db = require('../db/connect');
var employee = {};
db.connect(function (db) {
	var comment = db.collection('comment').find();	
	comment.forEach(function (doc) {
		var workid = doc.workid;
		if(employee.hasOwnProperty(workid)) {
			employee[workid].push(doc.rate);
		} else {
			employee[workid] = [];
			employee[workid].push(doc.rate);
		}
	}, function (err) {
		if (err) {
			throw err;
		}
		
		var scores = {};
		for(var i in employee) {
			var rates = employee[i];
			if (rates.constructor.name === 'Array') {
				var score = 0;
				rates.forEach(function(rate) {
					score += ~~rate;
				});
				var ave = score/rates.length;
				scores[i] = ave;
			}
		}
		// write to db
		var len = Object.keys(scores).length;
		var flag = 0;
		for(var i in scores) {
			console.log(i, ' =>', scores[i]);
			db.collection('employee')
			  .updateOne({'workid': i}, {$set: {'score': scores[i]}}, function() {
			  				console.log('update success');
						 	flag++;
						 	if(flag === len) {
								db.close();
								console.log('Connection closed.');
							}
						 });
		}		
	});
});
