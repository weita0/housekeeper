/**
 * Employee model
 */
module.exports = function(name, password, gender, birth, locate, idnum, workid, type) {
	return {
		name: name,
		password: password, // at least 9 characters
		gender: gender,  // 'm' representing 'male' and 'f' representing 'femail'
		birth: birth,  // format 'xxxx-xx-xx'
		locate: locate, // [latitude, longtitude]
		idnum: idnum,  // 18 characters
		workid: workid, // auto created, not provided by user
		type: type // 4 types: ('wa')washing, ('la')laundry, ('ba')babysitter, ('nu')nurse 
	};
};