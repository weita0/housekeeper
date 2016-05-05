var uuid = require('../modules/order/uuidGenerator');

for (var i = 0; i < 10; i+=1) {
    console.log(uuid());
}