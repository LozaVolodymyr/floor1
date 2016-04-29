var MongoClient = require('mongodb').MongoClient,
         assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/posts';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);




  db.collection('post').find({}).toArray(function (err, data) {

    data.forEach(function (el, index) {
    var obj = el.params;
    var str = obj.toString();

     var catids = str.match(/"catids":\[[\d\D\s\S]+?]/g);
     if(catids[0]){
     var catid = catids[0].replace('"catids":', '');
     var cat = catid.replace(/"/g, '');
         
     }
     var language = str.match(/"language":"\w\w-\w\w"+?/g);
     if(language != null) {
     var langu = language[0].replace('"language":"', '');
     var lang = langu.replace('"', '');
     }
     var posts = {
            id: el.id,
            ref_id: el.ref_id,
            title: el.title,
            fulltext: el.fulltext,
            url: el.url,
            created: el.created,
            modifield: el.modifield,
            message: el.message,
            catids: cat,
            language: lang
        };
    console.log(posts)
    
    db.collection('newPosts').insertOne(posts);
  })
    
  })
  console.log("Connected correctly to server");
 
//   db.close();
});