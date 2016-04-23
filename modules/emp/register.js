/**
 * Part of emloyee management system.
 * This module is used for new employee to register in the system. 
 */

var db = require('../db/connect'),
	encrypt = require('../security/encrypt'),
	workid = require('./workid'),
	logger = require('../util/logger');

var reg = function(employee, fn) {
	logger.info(employee);
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
				employee.password = encrypt(String(employee.password));
				employee.workid = workid.createID(employee.idnum);
				//console.log('before insert =>', employee);
				db.collection('employee').insertOne(employee);
				// hide the protected information
				delete employee.password;
				delete employee._id;
				//console.log('after insert =>', employee);
				var msg = 'true';
				fn({ message: msg,
					 employee: employee});
				db.close();
			} else {
				var msg = 'false';
				fn({ message: msg,
					 employee: {}});
				db.close();
			}
		});

	});
}

module.exports = reg;