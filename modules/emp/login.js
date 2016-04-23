/**
 * part of employee management system
 */
var db = require('../db/connect'),
	encrypt = require('../security/encrypt'),
	employee = require('../model/employee'),
	logger = require('../util/logger');
/*
 * to be completed later... 
 */
var login = function(workid, password, fn) {
	logger.debug('workid =>', workid,
				 '\npassword =>', password);
	db.connect(function(db) {
		var emp = {};
		var msg = 'false';
		var cursor = db.collection('employee').find({workid: workid, password: encrypt(password)});
		cursor.forEach(function(doc) {
			if(doc !== null) {
				emp = employee( doc.name,
									doc.password,
									doc.gender,
									doc.birth,
									doc.locate,
									doc.idnum,
									doc.type);
				delete emp.password;
				msg = 'true';
			}
		}, function(err) {
			if(err) {
				throw err;
			}
			fn({message: msg,
				employee: emp});
			db.close();
		});	
	});
};

module.exports = login;