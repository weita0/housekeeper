var express = require('express');
var router = express.Router();
var reg = require('../modules/emp/register');
var login = require('../modules/emp/login');
var employee = require('../modules/model/employee');

router.get('/', function(req, res) {
	res.render('employee');
});

router.post('/reg', function(req, res) {
	var name = req.body.name,
		password = req.body.password,
		gender = req.body.gender,
		birth = req.body.birth,
		locate = req.body.locate,
		idnum = req.body.idnum;
		type = req.body.type;
	console.log('name -', name,
				'\npwd -', password,
				'\ngen -', gender,
				'\nbir -', birth,
				'\nloc -', locate,
				'\nidnum -', idnum,
				'\ntype -', type);
	/* to be done... */
	reg(employee(
			name: name, 
			password: password, 
			gender: gender,
			birth: birth,
			locate: locate, 
			idnum: idnum,
			type: type), function(employee) {
		res.send(JSON.stringify(employee));
	});
});

router.post('/login', function(req, res) {
	var workid = req.body.workid,
		password = req.body.password;
	login(employee({workid: workid, password: password}), function(employee) {
		res.send(JSON.stringify(employee));
	});
});

module.exports = router;