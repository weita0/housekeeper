/**
 * four kinds of order: wa, la, ba, nu
 * for wa, quantity is needed,
 * for la, area is needed,
 * for ba and nu, duration is needed.
 */
var getPrice = require('./price');
var db = require('../db/connect');
var logger = require('../util/logger'); 
var uuid = require('./uuidGenerator');

module.exports = function (info, cb) {
    var type = info.type,
        addr = info.addr,
        workid = info.workid,
        tel = info.tel;
    
    var msg = true;
    
    if(!workid || !tel || !addr) {
        msg = false;
    }
    switch (type) {
        case 'wa':
            var q = Number(info.quantity);
            var price = wa(q);
            break;
        case 'la':
            var area = Number(info.area);
            var price = la(area);
            break;
        case 'nu':
            var duration = Number(info.duration);
            var price = nu(duration);
            break;
        case 'ba':
            var duration = Number(info.duration);
            var price = ba(duration);
            break;
        default:
            logger.debug('wrong type!!!');
            msg = false;
    }
    
    // function that creates order number
    var orderNo = uuid();
    
    if (msg) {
        db.connect(function (db) {
            var orderinfo = {
                'no': orderNo,
                'tel': tel,
                'addr': addr,
                'workid': workid,
                'type': type,
                'price': price,
                'duration': duration,
                'area': area,
                'quantity': quantity,
                'date': Date.now(),
                'paid': false 
            };
            db.collection('order').insertOne(orderinfo);
            cb({
                message: '1',
                orderDetail: orderinfo
            });
            logger.debug('Connection closed.');
            db.close();
        });
    } else {
        cb({
            message: '0',
            orderDetial: {}
        });
        logger.debug('Connection closed.');
        db.close();
    }
}


var price = getPrice();
logger.info('price of wa =>', price.wa,
            '\nprice of la =>', price.la,
            '\nprice of nu =>', price.nu,
            '\nprice of ba =>', price.ba);
            
var wa = function (q) {
    return q * Number(price.wa);
}

var la = function (area) {
    return area * Number(price.la);
}

var ba = function (duration) {
    return duration * Number(price.ba);
}

var nu = function (duration) {
    return duration * Number(price.nu);
}