var db = require('../modules/db/connect');

db.connect(function (db) {
   var cursor = db.collection('comment').find({'workid': 'j7112044'});
   for (var i in cursor) {
       if (typeof cursor[i] === 'function') {
           //console.log(i);
       }
   }
   //cursor = cursor.next();
   
   console.log('cursorLimit =>', cursor.cursorLimit());
   
   while (cursor.hasNext()) {
       console.log(1);
       cursor.next();
   }
   
   
   cursor.forEach(function (doc) {
     var workid = doc.workid,
       rate = doc.rate,
       comment = doc.comment;
       console.log('workid =>', workid,
                 '\nrate =>', rate,
                 '\ncomment =>', comment); 
     }, function () {
       db.close();
   });
   
});