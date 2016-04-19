/* Using the given birthday(formating as 'xxxx-xx-xx') to age */
var getAge = function(birth) {
	var ymd = birth.split('-');
	var year = ymd[0],
		month = ymd[1],
		day = ymd[2];
	Date.now - Date.parse(Date(year, month, day));
};

module.exports = 
