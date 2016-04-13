/**
 * Part of emloyee management system.
 * This module is used for new employee to register in the system. 
 */
var db = require('../db/connect'),
	encrypt = require('../security/encrypt'),
	workid = require('./workid');

var reg = function(employee, fn) {
	db.connect(function(db) {
		var exist = false;
		var cursor = db.collection('employee').find();
		cursor.forEach(function(doc) {
			if(doc.idnum === employee.idnum) {
				exist = true;
			}
		}, function(err) {
			if(err)
				throw err;
			if(!exist) {
				employee.password = encrypt(employee.password);
				employee.workid = workid.createID(employee.idnum);
				//console.log('before insert =>', employee);
				db.collection('employee').insertOne(employee);
				delete employee.password;
				delete employee._id;
				//console.log('after insert =>', employee);
				fn(employee);
				db.close();
			} else {
				fn({});
				db.close();
			}
		});

	});
}

module.exports = reg;