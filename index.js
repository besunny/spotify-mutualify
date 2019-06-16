const userTracks = require("./getUserTracks");
const userId = require("./functions");
var user1Tracks;
var user2Tracks;
var similarTracks = [];

function isSimilar(track1, track2) {
  // console.log(track1.id,track2.id,track1.id === track2.id)
  if (track1.id === track2.id) {
    return true;
  }

  return false;
  // if (track1.artist )
}

function compareUserTracks() {
  for (var j = 0; j < user1Tracks.length; j++) {
    for (var i = 0; i < user2Tracks.length; i++) {
      if (isSimilar(user1Tracks[j].track, user2Tracks[i].track)) {
        similarTracks.push(user1Tracks[j].track);
        user2Tracks.splice(i, 1);
        break;
      }
    }
  }

  console.log(
    similarTracks.map(
      track =>
        track.name + " - " + track.album.name + " - " + track.album.artists[0].name
    )
  );
  console.log(similarTracks.length);
}

// spotify:track:7LVHVU3tWfcxj5aiPFEW4Q
// spotify:track:7LVHVU3tWfcxj5aiPFEW4Q

function findSimilarTracks(userProfile1, userProfile2) {
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

findSimilarTracks(
  "https://open.spotify.com/user/22eobfnzs5lajea4hasm2irsa?si=vKsIB_B-QlyB2Tgnu1Z7mA",
  "https://open.spotify.com/user/meliad_/playlist/1d5RoA7DW18EMZ3BSRzFb1?si=368FKrA2RXGZb2W7jhCBGQ"
);
