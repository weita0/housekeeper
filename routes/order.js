var express = require('express');
var router = express.Router();
var logger = require('../modules/util/logger');
var createOrder = require('../modules/order/createOrder');
var searchOrder = require('../modules/order/searchOrder');

router.get('/', function (req, res) {
	res.send('Order Management System');
});

router.get('/lala', function (req, res) {
	res.send(req.path);
});

router.get('/:tel', function (req, res) {
	var tel = req.params.tel;
	searchOrder(tel, function (orders) {
		res.json(orders);
	});
});


router.get(/^(\/create\/)(wa|la|ba|nu)$/, function (req, res) {
	var type = req.path.split('\/')[2];
		duration = req.query.duration, // for ba and nu
		area = req.query.area, // for la
		quantity = req.query.quantity, // for wa
		addr = req.query.addr, 
		tel = req.query.tel,
		workid = req.query.workid;
	logger.info('order type =>', type);	
	createOrder({
		duration: duration,
		area: area,
		quantity: quantity,
		addr: addr,
		tel: tel,
		workid: workid,
		type: type
	}, function (order) {
		res.json(order);
	});
});

module.exports = router; 