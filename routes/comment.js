var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
	res.send('comment system');
})

router.get('/submit', function(req, res) {
	var workid = req.query.workid,
		rate = req.query.rate,
		comment = req.query.comment,
		user = req.query.user;
	
});

module.exports = router;

