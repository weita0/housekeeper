var crypto = require('crypto');

module.exports = function(data) {
	var hash = crypto.createHash('sha256');
	return hash.update(data).digest('hex');
};