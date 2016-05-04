var db = require('../modules/db/connect');
var test = require('assert');

db.connect(function (db) {
   'use strict';
   var collection = db.collection('comment');
   
   var cursor = collection.find({'workid': 'j7112044'});
   
   var i = 0;
   /*
   cursor.hasNext().then(function (o) {
      if (o) {
          
          cursor.forEach(function (doc) {
             console.log('i =>', i);
             i += 1;
             console.log('workid =>', doc.workid,
                         '\nrate =>', doc.rate,
                         '\ncomment =>', doc.comment); 
          });
      }
   });
   */
  cursor.toArray(function (err, result) {
      if (err) {
          throw err;
      } else if (result.length) {
          console.log('Found:', result.length);
          for (var i = 0; i < result.length; i+=1) {
              console.log(result[i]);
          }
      } else {
          console.log('nothing found');
      }
      //db.close();
  });
   
   
});