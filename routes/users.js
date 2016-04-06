var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Schema = mongoose.Schema;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//module.exports = router;
module.exports = function(app) {
	app.get('/users', function(req, res) {
		console.log('username =>', req.query.username,
				  	'\npassword =>', req.query.password);
		res.send('response with a resource');
	});
};

module.exports = function(app) {
	app.post('/signin', function(req, res) {
		mongoose.connect('mongodb://weitao:weitao@ds023108.mlab.com:23108/housekeepe');

		var username = req.body.username;
		var password = req.body.password;

	});
}

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
