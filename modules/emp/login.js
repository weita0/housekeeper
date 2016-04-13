/**
 * part of employee management system
 */
var db = require('../db/connect'),
	encrypt = require('../security/encrypt');
/*
 * to be completed later... 
 */
var login = function(employee, fn) {
	db.connect(function(db) {
		var cursor = db.collection('employee').find({workid: employee.workid, password: encrypt(employee.password)});
		cursor.forEach()		
	});
};

module.exports = login;