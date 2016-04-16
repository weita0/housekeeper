var crypto = require('crypto');

module.exports = function(data) {
	console.log('data -', data,
				'\ntype -', typeof data);
	var hash = crypto.createHash('sha256');
	return hash.update(data).digest('hex');
};