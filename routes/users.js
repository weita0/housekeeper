var express = require('express');
var router = express.Router();
var signin = require('../modules/auth/signin');
var signon = require('../modules/auth/signon');
var logger = require('../modules/util/logger');

//var Schema = mongoose.Schema;

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('user');
});

router.get('/signin', function(req, res) {
	var username = req.query.username,
		password = req.query.password;
	logger.info('request.username =>', username,
				'\nrequest.password =>', password);
	signin(username, password, function(userinfo) {
		if(Object.keys(userinfo).length !== 0) {
			res.send(JSON.stringify(userinfo));
		} else {
			res.send('sign in failed.');
		}
	});
});

router.get('/signon', function(req, res) {
	var username = req.query.username,
		password = req.query.password,
		tel = req.query.tel;
	logger.info('request.username =>', username,
				'\nrequest.password =>', password,
				'\nrequest.tel =>', tel);
	signon(username, password, tel, function(theuser) {
		if(Object.keys(theuser).length !== 0) {
			res.send(JSON.stringify(theuser));
		} else {
			res.send('sign on failed.');
		}
	});
})



//module.exports = router;
module.exports = router;

/*
module.exports = function(app) {
	app.post('/signon', function(req, res) {
		mongoose.connect('mongodb://weitao:weitao@ds023108.mlab.com:23108/housekeepe');
		var username = req.body.username;
		var password = req.body.password;
		var User = mongoose.Schema({
			username: String,
			password: String
		});
		var user = mongoose.model('User', )
	});
}
*/