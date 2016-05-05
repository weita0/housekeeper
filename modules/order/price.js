var fs = require('fs');
var path = require('path');

var logger = require('../util/logger');

module.exports = function () {
    var config = path.join(__dirname, '../../config/price.json');
    logger.info('price config file =>', config);
    var info = JSON.parse(fs.readFileSync(config, 'utf8').toString());
    return {
        'wa': info.wa,
        'la': info.la,
        'nu': info.nu,
        'ba': info.ba
    };
}