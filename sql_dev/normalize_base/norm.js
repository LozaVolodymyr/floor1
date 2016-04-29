var MongoClient = require('mongodb').MongoClient,
         assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/posts';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
var duplicate = [];

  db.collection('newPosts').find({}).toArray(function (err, data) {
          db.collection('newPosts').aggregate([
                        // Stage 1
                        { $match: { ref_id: {$ne:null} } },
                        // Stage 2
                        { $group: {
                           _id : "$ref_id",
                           dups: {"$addToSet":"$_id"},
                           num : {$sum: 1}
                        }},
                        { $match: { num:{"$gt": 1 }}},
                        // Stage 3
                        { $sort: { num: 1 }}], 
          function (err, results) {
                results.forEach(function (el) {        
                  el.dups.shift();
                   el.dups.forEach(function(el){
                       duplicate.push(el);
                   })
               
                })             
      
    duplicate.forEach(function(el, index){
                   console.log(el + ' – ' + index);
                   db.collection('newPosts').remove({_id: el })
                       
                   })    
            })
            
  
  console.log("Connected correctly to server");
});


});


    
