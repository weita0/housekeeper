var express = require('express');
var router = express.Router();
var signin = require('../modules/auth/signin');
var signon = require('../modules/auth/signon');

//var Schema = mongoose.Schema;

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('user management system');
});

router.post('/signin', function(req, res) {
	var username = req.body.username,
		password = req.body.password;
	console.log('request.username =>', username,
				'\nrequest.password =>', password);
	signin(username, password, function(userinfo) {
		if(Object.keys(userinfo).length !== 0) {
			res.send(JSON.stringify(userinfo));
		} else {
			res.send('sign in failed.');
		}
	});
});

router.post('/signon', function(req, res) {
	var username = req.body.username,
		password = req.body.password,
		tel = req.body.tel;
	console.log('request.username =>', username,
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