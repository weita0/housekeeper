/**
 * workid creator
 * the rule is: one random low case alpha character + one random number + the last six number of ID card number.
 */

var workid = workid || {};

/* 
 * get a random number between low(include)and high(exclude)
 */
function random(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

function randomNum() {
	return String.fromCharCode(random(48, 58));
}

function randomAlpha() {
	return String.fromCharCode(random(97, 123));
}

workid.createID = function(idnum) {
	return randomAlpha() + randomNum() + idnum.slice(idnum.length - 6, idnum.length);
};

module.exports = workid;