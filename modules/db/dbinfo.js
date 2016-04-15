var fs = require('fs');
var path = require('path');

var dbinfo = dbinfo || {};

/*
fs.readFile('../../config/db.json', 'utf8', function(err, data) {
	console.log(1);
	if(err)
		throw err;
	var obj = JSON.parse(data.toString());
	for(var i in obj) {
		console.log(i + '-->' + obj[i]);
	}
});

var obj = JSON.parse(fs.readFileSync('config/localdb.json', 'utf8').toString());
for(var i in obj) {
	dbinfo[i] = obj[i];
}
dbinfo.uri = dbinfo.hostname + ':' + dbinfo.port + '/' + dbinfo.dbname;
*/

module.exports = function() {
	console.log('config path =>', path.join(__dirname, '../../config/localdb.json'));
	var obj = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/localdb.json'), 'utf8').toString());
	for(var i in obj) {
		dbinfo[i] = obj[i];
	}
	dbinfo.uri = dbinfo.hostname + ':' + dbinfo.port + '/' + dbinfo.dbname;
	return {
		'dbuser': dbinfo.dbuser,
		'dbpassword': dbinfo.dbpassword,
		'uri': dbinfo.uri
	}
};
