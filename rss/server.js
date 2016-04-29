var express = require('express');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var Feed = require('feed');
var request = require('request');
var fs = require('fs');

var date = new Date();

app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect('mongodb://localhost:27017/posts', function(err, db) {
    "use strict";

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");



    // Ua

 	app.get('/rss-ua', function(req, res) {
	    var feed = new Feed({
	        title:          'Закордонні новини  - BUBLBE.COM',
	        description:    'Огляд зарубіжних змі та переклад найцікавіших новин від Bublbe.com',
	        link:           'http://bublbe.com',
			create: 		'date'
	 
	    });
	    db.collection('newPosts').find({language:"uk-UA"}).sort({_id: -1}).limit(10).toArray(function(err, posts) {
			console.log(posts)
	         if(err)
	            res.send('404 Not found', 404);
	        else {
	            for(var key in posts) {
	                feed.item({
	                    title:          posts[key].title,
	                    link:           posts[key].url,
	                    description:    posts[key].fulltext,
						date:   		posts[key].created
						
	                });
	            }
	            // Setting the appropriate Content-Type
	            res.set('Content-Type', 'text/xml');

	            // Sending the feed as a response
	            res.send(feed.render('rss-2.0'));	

	        }
	    });
	});

 // RU

	app.get('/rss-ru', function(req, res) {
	    var feed = new Feed({
	        title:          'Зарубежные новости  - BUBLBE.COM',
	        description:    'Обзор иностранной прессы и переводы самых интересных новостей от Bublbe.com',
	        link:           'http://bublbe.com',
	 
	    });
	    db.collection('newPost').find({language:"ru-RU"}).toArray(function(err, posts) {
			console.log(posts)
	         if(err)
	            res.send('404 Not found', 404);
	        else {
	            for(var key in posts) {
	                feed.item({
	                    title:          posts[key].title,
	                    link:           posts[key].link,
	                    description:    posts[key].fulltext,
	                    language:       posts[key].language
	                });
	            }
	            // Setting the appropriate Content-Type
	            res.set('Content-Type', 'text/xml');

	            // Sending the feed as a response
	            res.send(feed.render('rss-2.0'));	

	        }
	    });
	});


// EN


	app.get('/rss-en/:category', function(req, res) {

		console.log(req.params.category);
		var category = req.params.category;
	    var feed = new Feed({
	        title:          'World News - BUBLBE.COM',
	        description:    'Breaking news, multimedia, reviews &amp;amp; opinion on Bublbe.com',
	        link:           'http://bublbe.com',
	 
	    });
	    db.collection('newPost').find({language:"en-GB", category:category}).limit(10).toArray(function(err, posts) {
	         if(err)
	            res.send('404 Not found', 404);
	        else {
	            for(var key in posts) {
	                feed.item({
	                    title:          posts[key].title,
	                    link:           posts[key].link,
	                    description:    posts[key].description,
	                    language:       posts[key].language
	                });
	            }
	            // Setting the appropriate Content-Type
	            res.set('Content-Type', 'text/xml');

	            // Sending the feed as a response
	            res.send(feed.render('rss-2.0'));	

	        }
	    });
	});



		// Запись в файл

		request('http://localhost:3000/rss', function (error, response, body) {
				  if (!error && response.statusCode == 200) {
				    fs.writeFile('storage/'+ date.toDateString() +'rss.xml', body, function(err){
				    	if (err) return console.log(err);
				    })
				  }
				})
});
 
app.listen(3000); console.log('Server started on 3000')