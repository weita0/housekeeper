var express = require('express');
var router = express.Router();
var reg = require('../modules/emp/register');
var login = require('../modules/emp/login');
var upload = require('../modules/emp/imgUpload');
var search = require('../modules/emp/search_by_type');
var searchById = require('../modules/emp/search_by_id');
var employee = require('../modules/model/employee');
var logger = require('../modules/util/logger');

router.get('/', function (req, res) {
	res.render('employee');
});

router.get('/reg', function (req, res) {
	logger.debug('/employee/reg');
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

router.get('/login', function (req, res) {
	logger.debug('/employee/login');
	var workid = req.query.workid,
		password = req.query.password;
	login(workid, password, function(employee) {
		res.send(JSON.stringify(employee));
	});
});

router.get(/^(\/)(wa|la|ba|nu)$/, function (req, res) {
	logger.debug('/employee/:type');
	logger.debug('req.baseUrl =>', req.baseUrl, // /employee
					 '\treq.hostname =>', req.hostname, // localhost
					 '\treq.ip =>', req.ip, //::1
					 '\treq.ips =>', req.ips, //[]
					 '\treq.path =>', req.path); // /wa
	var type = req.path.slice(1);
	logger.info('type =>', type);
	search(type, function(lst) {
		res.json(lst);
	});
});

router.get('/:workid', function (req, res) {
	logger.debug('/employee/:workid');
	var workid = req.params.workid;
	searchById(workid, function(info) {
		res.json(info);
	});
});

router.post('/imgUpload', function(req, res) {
	logger.debug('/employee/imgUpload');
	upload(req, function(msg) {
		res.json(msg);
	});
});

module.exports = router;