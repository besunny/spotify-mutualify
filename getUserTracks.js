var request = require('request');

var client_id = 'f278f9f61bf040938b377d340f15a4ff'; // Your client id
var client_secret = 'ac3feb0162524ba4ade6622cc996488f'; // Your secret
var token;



function getAPIToken(onReady) {
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

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            token = body.access_token;
            onReady();
        }
    });
}

function getAPIData(URL, onload) {
    var options = {
        url: URL,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };

    request.get(options, function (error, response, body) {
        onload(body);
    });
}

//   var options = {
//     url: 'https://api.spotify.com/v1/users/22eobfnzs5lajea4hasm2irsa/playlists',
//     headers: {
//       'Authorization': 'Bearer ' + token
//     },
//     json: true
//   };

//   request.get(options, function(error, response, body) {
//     console.log(body);
//   });

//   var options = {
//     url: 'https://api.spotify.com/v1/playlists/0pHmFQPprB8seaBEVYxUiE/tracks?limit=100',
//     headers: {
//       'Authorization': 'Bearer ' + token
//     },
//     json: true
//   };

//   request.get(options, function(error, response, body) {
//     console.log(body);
//   });


function getUserPlaylists(userId) {
    getAPIData('https://api.spotify.com/v1/users/'+userId+'/playlists', function(data) {
        console.log(data.items);

        if (data.next) {
            getAPIData(data.next, function(data) {
                console.log(data.items);

                if (data.next) {
                    getAPIData(data.next, function(data) {
                        console.log(data.items);
                        
                        if (data.next) {
                            getAPIData(data.next, function(data) {
                                console.log(data.items);
                                
                            })
                        }
                    })
                }
            })
        }
    })
}

function getUserTracks(userId) {
    if (token === undefined) {
        getAPIToken(function () {
            getUserTracks(userId)
        });

        return;
    }

    getUserPlaylists(userId);
}

getUserTracks('22eobfnzs5lajea4hasm2irsa');

// https://api.spotify.com/v1/users/{user_id}/playlists