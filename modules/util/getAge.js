/* Using the given birthday(formating as 'xxxx-xx-xx') to age */
var logger = require('./logger');

var getAge = function(birth) {
	var ymd = birth.split('-');
	var birth_year = ymd[0],
		birth_month = ymd[1] - 1,
		birth_day = ymd[2];
	logger.info('birth_year =>', birth_year,
				'\tbirth_month =>', birth_month,
				'\tbirth_day =>', birth_day);
	//daysBetween(Date.now, Date.parse(new Date(year, month - 1, day)));
	var now = new Date();
	var current_day = now.getDate(),
		current_month = now.getMonth(),
		current_year = now.getFullYear();
	logger.info('current_year =>', current_year,
				'\tcurrent_month =>', current_month,
				'\tcurrent_day =>', current_day);
	var age = current_year - birth_year;
	if(current_month > birth_month
	   || (current_month === birth_month && current_day < birth_day)) {
		age++;
	}
	return age;
};

var daysBetween = function (firstDate, secondDate) {
	return Math.floor((firstDate - secondDate)/(1000 * 60 * 60 * 24));
}

module.exports = getAge;
