var formidable = require('formidable'),
	fs = require('fs'),
	path = require('path'),
	logger = require('../util/logger'),
	db = require('../db/connect');

var imgUpload = function(request, fn) {
	var form = new formidable.IncomingForm();
	form.uploadDir = 'public/images';
	form.keepExtensions = true;
	
	logger.info('begin to parse');
	form.parse(request, function(err, fields, files) {
		if (err) {
			throw err;
		}
		var workid = fields.workid;
		logger.info('workid =>', workid);

		var originPath = files.upload.path;
		logger.debug('original path =>', originPath);
		var parts = originPath.split('\\');

		var extName = path.extname(originPath); // it can be jpg, png, jpeg and so on..
		var len = parts.length;
		parts[len - 1] = workid + extName;
		var imageurl = path.join(parts[len - 2], parts[len - 1]);
		fs.rename(files.upload.path, parts.join('\\'), function() {
			logger.info('parsing done');
			db.connect(function(db) {
				db.collection('employee')
				  .updateOne({'workid': workid},
				  			 {$set: {'imageurl': imageurl}});
				db.close();
			});
			var msg = 1;
			fn({message: msg});
		});
		
	});
};

module.exports = imgUpload;