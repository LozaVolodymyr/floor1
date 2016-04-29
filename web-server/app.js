var express = require('express'),
    app = express();
var bodyParser = require('body-parser');
var request = require('request');
var FB = require('fb');


var graph = require('fbgraph');
// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;


app.use(bodyParser.urlencoded({ extended: false }));

// Facebook User and Group config
var user_id = '499320920251575';
var group_id = '225860594468080';

// Facebook App config		
var client_id = '831794450259457';
var client_secret = '007a98d6593bda1e4fefc8bb7ad1c9ca';
var redirect_uri = 'http://176.37.219.61:5001/';
// 4.12.2016 userAccessToken for 60-days;
var userAccessToken = 'CAAL0gzy73gEBABJj8YWCJYeAi4w4PhDZChzvSZBciFAVRT5DXGEdc0nPzfZCjV4ZBhNPhvRmsooMHInI8jqH1OOllrxIt1XdZBJwLYd7oCC0tYA5ZBhKD0rz4XjZAMrDVFyMtFSev6wF8T3UXBA64Uaj5rVc9L9VbWDruSawoFW2AylwixTuyftArW25ptiQYaqAvBl4Ext8QZDZD';

        // get authorization url 
    var authUrl = graph.getOauthUrl({
        "client_id":     client_id
      , "redirect_uri":  redirect_uri
    });
 
  
// method to extend userAccessToken
var reqAccessToken = 'https://graph.facebook.com/oauth/access_token?client_id='+ client_id  +'&client_secret='+ client_secret +'&grant_type=fb_exchange_token&fb_exchange_token=' + userAccessToken;

request(reqAccessToken, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var access_token = body.replace('access_token=', '').replace(/&expires=[\d]+/, ''); // Show the HTML for the Google homepage.
    console.log(access_token);
	FB.setAccessToken(access_token);
  }
})
 
'https://www.facebook.com/dialog/oauth?client_id=490906791103518&redirect_uri=http://176.37.219.61:5001/&scope=manage_pages%2Cpublish_stream&state=+1234567890'

request('https://www.facebook.com/dialog/oauth?client_id='+client_id+'&redirect_uri='+redirect_uri+'&scope=manage_pages%2Cpublish_stream&state='+1234567890, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body);
    var access_token = body.replace('access_token=', '').replace(/&expires=[\d]+/, ''); // Show the HTML for the Google homepage.
  }
})




request('https://graph.facebook.com/endpoint?key=value&amp;access_token=' +client_id + '|'+ client_secret, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var access_token = body.replace('access_token=', '').replace(/&expires=[\d]+/, ''); // Show the HTML for the Google homepage.
    console.log(access_token);
	FB.setAccessToken(access_token);
  }
})
// https://www.facebook.com/dialog/oauth?client_id=<APP_ID >&redirect_uri=<REDIRECT_URL >&scope=manage_pages%2Cpublish_stream&state=<STATE>
// method to get appAccessToken
FB.api('oauth/access_token', {
    client_id: '831794450259457',
    client_secret: '007a98d6593bda1e4fefc8bb7ad1c9ca',
    grant_type: 'client_credentials'
}, function (res) {
	console.log(res)
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    var apiAccessToken = res.access_token; 
});
// method to posting in group
app.post('/callback', function (req, res) {
 		for(var p in req.body){ var url = p; }
  	FB.api( group_id +'/feed', 'post', { link: url } , function (res) {
  		if(!res || res.error) {
    		console.log(!res ? 'error occurred' : res.error);
    		return;
  		}
  			console.log('Post Id: ' + res.id);
	});
  			res.end();
});

app.listen(5001, function () {
  console.log('Example app listening on port 5001!');
});


