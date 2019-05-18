exports.removeDuplicateTracks = function(tracks) {
    const seenTracks = [];
    
    const filteredTracks = tracks.filter(function(track) { 
        if (seenTracks.includes(track.track.id)) {
            return false;
        } else {
            seenTracks.push(track.track.id);
            return true;
        }
    });

    return filteredTracks;
};