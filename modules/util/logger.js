var winston = require('winston'),
	path = require('path');
winston.emitErrs = true;

var logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: path.join(__dirname, '../../log/console.log'),
			handleException: true,
			json: true,
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			colorize: false
		}),
		new winston.transports.Console({
			level: 'debug',
			handleException: true,
			json: false,
			colorize: true
		})
	],
	exitOnError: false
});

module.exports = logger;
module.exports.stream = {
	write: function(message, encoding) {
		logger.info(message);
	}
};