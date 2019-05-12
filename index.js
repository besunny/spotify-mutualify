const userTracks = require("./getUserTracks");
const userId = require("./functions");
var user1Tracks;
var user2Tracks;

function compareUserTracks() {
  console.log('DONE!');
}

function similarTracks(userProfile1, userProfile2) {
  var userId1 = userId.get(userProfile1);
  var userId2 = userId.get(userProfile2);

  userTracks.get(userId1, function(tracks) {
    console.log(userId1, tracks.length);
    user1Tracks = tracks;
    if (user2Tracks !== undefined) {
      compareUserTracks();
    }
  });
  
  userTracks.get(userId2, function(tracks) {
    console.log(userId2, tracks.length);
    user2Tracks = tracks;
    if (user1Tracks !== undefined) {
      compareUserTracks();
    }
  });
}


similarTracks("https://open.spotify.com/user/lilayas?si=jpan9IqPRP2U44G7VFIwcA", "https://open.spotify.com/user/meliad_?si=jM-AKrzPQYGsAGuPb1eYBg");
