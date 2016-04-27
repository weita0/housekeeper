var express = require('express');
var router = express.Router();

/* for testing */

router.get('/', function (req, res) {
	res.render('imgUpload');
});


module.exports = router;