var express = require('express');
var fbgraph = require('fbgraphapi');
var app = express();
var session = require('express-session')
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
// Facebook User and Group config


var user_id = '499320920251575';
var group_id = '225860594468080';

// Facebook App config    
var client_id = '831794450259457';
var client_secret = '007a98d6593bda1e4fefc8bb7ad1c9ca';

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser())
// app.use(session({ secret: '55-55-05',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }}));

app.use(fbgraph.auth( {
    appId : client_id,
    appSecret : client_secret,
    redirectUri : "http://176.37.219.61:5001/",
    apiVersion: "v2.6"
  }));

app.get('/login', function(req, res) {
  console.log('Start login');
  fbgraph.redirectLoginForm(req, res);  
});
app.get('/rss', function(req, res) {
  console.log('Start rss'); 
});


app.get('/', function(req, res) {
  if (!req.hasOwnProperty('facebook')) {
    console.log('You are not logged in');
    return res.redirect('/login');
  }
  /* See http://developers.facebook.com/docs/reference/api/ for more */
  req.facebook.graph('/me', function(err, me) {
      console.log(me);
  });
  
  req.facebook.graph('/me?fields=id,name', function(err, me) {
      console.log(me);
  });
  
  req.facebook.me(function(err, me) {
      console.log(me);
  });
  
  // /me/likes
  req.facebook.my.likes(function(err, likes) {
      console.log(likes);
  });
  
  res.end("Check console output");
});

server.listen(5005);