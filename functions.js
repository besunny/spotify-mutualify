// https://open.spotify.com/user/lilayas
// https://open.spotify.com/user/22eobfnzs5lajea4hasm2irsa
//https://open.spotify.com/user/samira_da
//https://open.spotify.com/user/tgiuxauq2zcthfwhrf6rq4fo3/

function getUserId(profileAddress) {
    var userId = profileAddress.split('user/')[1];
    if (userId.indexOf('/') !== -1) {
        userId = userId.split('/')[0];
    }

    if (userId.indexOf('?') !== -1) {
        userId = userId.split('?')[0];
    }

    return userId;
}

exports.get = getUserId;