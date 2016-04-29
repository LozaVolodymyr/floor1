var MongoClient = require('mongodb').MongoClient,
         assert = require('assert');
var mysql = require('mysql');
var striptags = require('striptags');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'ukrurbat_main'
});
var mongoUrl = 'mongodb://localhost:27017/test1';
var mongoCollection = 'test1';

var num = process.env.num;

connection.connect(function (err, res) {
		console.log('Connected MYSQL to server');
});
MongoClient.connect(mongoUrl, function(err, db) {
	assert.equal(null, err);
	console.log("Connected MongoDB to server");
	
connection.query("SELECT * FROM `os0fr_content` ORDER BY `id` DESC LIMIT "+ num +"", function(err, rows, fields) {
  if (err) throw err;
  	rows.forEach(function(el, index){
		   var catid = reNameCat(el['catid']);
     	   var fulltext = regFullText(el['introtext']);
		   var title_images = getImgLing(el['introtext']);	 
 				 var obj = {
					  		  id: el['id'],
						  	  asset_id: el['asset_id'],
						  	  alias: el['alias'],
						  	  title: el['title'],
						  	  fulltext: fulltext,
						  	  title_images: title_images,
						  	  catid: catid,
						  	  created_by: el['created_by'],
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
	}, 4000)	
});


	

function reNameCat (catID){
var catid;
			if(catID == 89 ){
				catid = 'obshchestvo';
			   }
			if(catID== 88 ){
				   catid = 'ekonomika-i-biznes';
			   }
			 if(catID == 87 ){
				   catid = 'novosti-politiki';
			   }
			  if(catID== 104 ){
				   catid = 'suspilstvo';
			   }
			  if(catID== 103 ){
				   catid = 'ekonomika-i-biznes';
			   }
			   if(catID== 102 ){
				   catid = 'novini-politiki';
			  }
return catid;			
}

function regFullText(str){
	// var text = str.replace(/<p>/, '');
	var text = striptags(str).replace(/\r\n/g, '');
	
	
	return text;
}

function getImgLing(str){
		var img = str.match(/<img[\s\S\d\D]+?\/>/g);
	return img;	
}