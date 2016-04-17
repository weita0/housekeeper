var crypto = require('crypto'),
	logger = require('../util/logger');

module.exports = function(data) {

	logger.info('data -', data,
				'\ntype -', typeof data);
	if(data !== undefined) {
		var hash = crypto.createHash('sha256');
		return hash.update(data).digest('hex');
	} else {
		return 'data is undefined!';
	}	
};