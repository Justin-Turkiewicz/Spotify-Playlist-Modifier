var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var stateKey = 'spotify_auth_state';

var client_id = '781e81484b8d48108ea949980400a2ee'; // Your client id
var client_secret = 'ff82ef993b02452d8313f0e142e64b66'; // Your secret
var redirect_uri = 'http://localhost:5000'; // Your redirect uri

const whiteList = 'http://localhost:3000';
const corsOptions = {
  origin: '"http://localhost:3000"',
  credentials: true
}
const cors = require("cors");

var generateRandomString = function(length: number) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
router.get('/', cors(corsOptions), function(req: any, res: any, next: any) {
  var state = generateRandomString(16);
  // console.log(JSON.stringify(req.headers));
  res.cookie(stateKey, state);
  //Set headers sent to spotify api
  // res.cookie('header', Object,{'Access-Control-Allow-Origin': 'http://localhost:3000'});
  // res.setHeader('Access-Control-Allow-Methods', 'GET');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // // your application requests authorization

  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

module.exports = router;