var db = require('../db/connect');
var logger = require('../util/logger'); 
var dateFormat = require('../util/dateForm');

module.exports = function (tel, cb) {
    var orders = [];
    var msg = '0';
    db.connect(function (db) {
        var cursor = db.collection('order').find({'tel': tel});
        cursor.toArray(function (err, res) {
            if (err) {
                throw err;
            } else if (res.length) {
                // do something..
                msg = '1';
                var len = res.length;
                for (var i = 0; i < len; i += 1) {
                    var tem = res[i];
                    orders.push({
                        'no': tem.no,
                        'tel': tem.tel,
                        'addr': tem.addr,
                        'workid': tem.workid,
                        'type': tem.type,
                        'price': tem.price,
                        'duration': tem.duration,
                        'area': tem.area,
                        'quantity': tem.quantity,
                        'date': dateFormat(tem.date),
                        'paid': tem.paid 
                    });
                }
            } else {
                logger.info('no order record..')
            }
            cb({
                message: msg,
                orders: orders
            });
            logger.debug('Connection closed.');
            db.close();
        });
    });
}