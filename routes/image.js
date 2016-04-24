var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.send('Image Server');
});

router.get('/:no', function (req, res) {
	var picNum = req.params.no;
	
});

module.exports = router;