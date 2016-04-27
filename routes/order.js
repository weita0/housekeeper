var express = require('express');
var router = express.Router();
var logger = require('../modules/util/logger');

router.get('/', function (req, res) {
	res.send('Order Management System');
});

router.get('/wa', function (req, res) {
	var quantity = req.query.quantity,
	    addr = req.query.addr,
	    tel = req.query.tel,
	    workid = req.query.workid;
});

router.get('/la', function (req, res) {
	var area = req.query.area,
		addr = req.query.addr,
		tel = req.query.tel,
		workid = req.query.workid;
});

router.get(/^(\/)(ba|nu)$/, function (req, res) {
	var duration = req.query.duration,
		addr = req.query.addr,
		tel = req.query.tel,
		workid = req.query.workid;
	
});

module.exports = router; 