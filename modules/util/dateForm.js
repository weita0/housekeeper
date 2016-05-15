/* parse  */

module.exports = function (milliSecond) {
    var d = new Date(milliSecond);
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var dd = d.getDate();
    return y + '-' + m + '-' + dd;
}