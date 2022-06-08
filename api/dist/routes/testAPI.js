"use strict";
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var stateKey = 'spotify_auth_state';
var client_id = '781e81484b8d48108ea949980400a2ee'; // Your client id
var client_secret = 'ff82ef993b02452d8313f0e142e64b66'; // Your secret
var redirect_uri = 'REDIRECT_URI'; // Your redirect uri
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
router.get('/', function (req, res, next) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    //Set headers sent to spotify api
    res.cookie('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // your application requests authorization
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
//# sourceMappingURL=testAPI.js.map