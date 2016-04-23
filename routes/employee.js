var express = require('express');
var router = express.Router();
var reg = require('../modules/emp/register');
var login = require('../modules/emp/login');
var search = require('../modules/emp/search_by_type');
var employee = require('../modules/model/employee');
var logger = require('../modules/util/logger');

router.get('/', function(req, res) {
	res.render('employee');
});

router.get('/reg', function(req, res) {
	var name = req.query.name,
		password = req.query.password,
		gender = req.query.gender,
		birth = req.query.birth,
		locate = req.query.locate,
		idnum = req.query.idnum;
		type = req.query.type;
	logger.debug('name -', name,
				'\npwd -', password,
				'\ngen -', gender,
				'\nbir -', birth,
				'\nloc -', locate,
				'\nidnum -', idnum,
				'\ntype -', type);
	/* to be done... */
	reg(employee(name, password, gender, birth, locate, idnum, type), function(employee) {
		res.send(JSON.stringify(employee));
	});
});

router.get('/login', function(req, res) {
	var workid = req.query.workid,
		password = req.query.password;
	login(workid, password, function(employee) {
		res.send(JSON.stringify(employee));
	});
});

router.get('/:type', function(req, res) {
	var type = req.params.type;
	logger.info('type =>', type);
	search(type, function(lst) {

	});
});

module.exports = router;