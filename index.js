
var request = require('request'); // "Request" library

var client_id = 'f278f9f61bf040938b377d340f15a4ff'; // Your client id
var client_secret = 'ac3feb0162524ba4ade6622cc996488f'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});
