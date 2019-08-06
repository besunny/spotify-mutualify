var request = require('request');
var utils = require('./utils/removeDuplicateTracks');


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
            onReady(token);
        }
    });
}

function getURLData(URL, callback) {
  var options = {
    url: URL,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };
  
  request.get(options, function(error,response, body) {
      callback(body);
  })
}

function getAllPages(URL, callback, allPages = []) {
    getURLData(URL, function(pageData) {
        allPages = allPages.concat(pageData.items);

        if ( pageData.next !== null ) {
            getAllPages(pageData.next, callback, allPages);
        } else {
            callback(allPages);
        }
    });
}

function getAllTracks(playlists, callback, allTracks = [], index = 0) {
    getAllPages(playlists[index].tracks.href, function(tracks) {
        allTracks = allTracks.concat(tracks);
        console.log('Tracks of Playlist '+index+' Loaded')
        index ++;
        if ( index !== playlists.length ) {
            getAllTracks(playlists, callback, allTracks, index)
        } else {
            callback(allTracks);
        }
    })
}

// getAPIToken(function () {
//     getAllPages('https://api.spotify.com/v1/users/22eobfnzs5lajea4hasm2irsa/playlists', function ( allplaylists ) {
//      getAllTracks( allplaylists, function(tracks) {
//          console.log(tracks.length)
//          tracks = utils.removeDuplicateTracks(tracks);
//          console.log(tracks.length);
//      } );
//      });
// });

function getUserTracks(userId, callback) {
    if (token === undefined) {
        getAPIToken(function () {
            getUserTracks(userId, callback);
        });
        return;
    }

    getAllPages('https://api.spotify.com/v1/users/'+userId+'/playlists', function( allplaylists ) {
        getAllTracks( allplaylists, function(tracks) {
            tracks = utils.removeDuplicateTracks(tracks);
            callback(tracks); 
        } );
    });
}

exports.get = getUserTracks;