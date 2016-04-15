var express = require('express');
var router = express.Router();
var submit = require('../modules/comment/insertComment');
var findComments = require('../modules/comment/findComment');


router.get('/', function(req, res) {
	res.send('comment system');
})

router.post('/submit', function(req, res) {
	var workid = req.body.workid,
		rate = req.body.rate,
		comment = req.body.comment,
		tel = req.body.tel;
	submit(workid, rate, comment, tel, function() {
		res.send('comment success');
	});
});

router.get('/:workid', function(req, res) {
	var workid = req.params.workid;
	console.log('workid =>', workid);
	findComments(workid, function(data) {
		res.send(data);
	});
});

module.exports = router;

