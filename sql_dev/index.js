var MongoClient = require('mongodb').MongoClient,
         assert = require('assert');
var mysql = require('mysql');

// var duplicate = [];

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'ukrurbat_main'
});

var mongoUrl = 'mongodb://localhost:27017/test1';
var mongoCollection = 'test1';

connection.connect(function (err, res) {
		console.log('Connected MYSQL to server');
});
MongoClient.connect(mongoUrl, function(err, db) {
	assert.equal(null, err);
	console.log("Connected MongoDB to server");
	
connection.query("SELECT * FROM `os0fr_content` ORDER BY `id` DESC LIMIT 100", function(err, rows, fields) {
  if (err) throw err;
  	rows.forEach(function(el, index){
 				 var obj = {
					  		  id: el['id'],
						  	  asset_id: el['asset_id'],
						  	  alias: el['alias'],
						  	  title: el['title'],
						  	  fulltext: el['introtext'],
						  	  catid: el['catid'],
						  	  created: el['created'],
						  	  modified: el['modified'],
						  	  publish_up: el['publish_up'],
						  	  language: el['language']
				  }	
					db.collection(mongoCollection).insertOne(obj);
				});
	
db.collection(mongoCollection).aggregate([
		{ $match: { asset_id: {$ne:null}}},
		{ $group: {
			_id : "$asset_id",
			dups: {"$addToSet":"$_id"},
			num : {$sum: 1}
		}},
		{ $match: { num: {"$gt": 1 }}},
        { $sort: { num: 1 }}], 
          function (err, results) {
               results.forEach(function (el) {        
                  	el.dups.pop();
                  	el.dups.forEach(function(el_id, index){
					  clearDb(el_id);
                   })      
			});   
		});	 
						function clearDb(el_id){
							db.collection(mongoCollection).remove({_id: el_id });
						}  							
	  });
	connection.end(function () {
	console.log('Sql connect lost');								
	});
	setTimeout(function(){
			db.close();
	console.log('MongoDB connect lost');
	}, 5000)	
});



