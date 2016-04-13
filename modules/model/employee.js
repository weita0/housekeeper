/**
 * Employee model
 */
module.exports = function(name, password, gender, birth, locate, idnum, workid) {
	return {
		name: name,
		password: password,
		gender: gender,
		birth: birth,
		locate: locate,
		idnum: idnum,
		workid: workid
	};
};