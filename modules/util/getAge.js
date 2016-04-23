/* Using the given birthday(formating as 'xxxx-xx-xx') to age */
var getAge = function(birth) {
	var ymd = birth.split('-');
	var birth_year = ymd[0],
		birth_month = ymd[1] - 1,
		birth_day = ymd[2];
	//daysBetween(Date.now, Date.parse(new Date(year, month - 1, day)));
	var now = new Date();
	var current_day = now.getDate(),
		current_month = now.getMonth(),
		current_year = now.getYear();
	var age = current_year - birth_year;
	if(current_month > birth_month
	   || (current_month === birth_month && current_day < birth_day)) {
		age++;
	}
};

function daysBetween(firstDate, secondDate) {
	return Math.floor((firstDate - secondDate)/(1000 * 60 * 60 * 24));
}

module.exports = getAge;
