// var natural = require('natural');
// var source = 'Shape Of My Heart - My Songs Version';
// var target = 'Shape Of My (Heart) - Live At Villa Manin, Cudriopo, Italy/1993';

// console.log(natural.LevenshteinDistance(source, target, {search: true}));
// console.log(source.slice(0, source.indexOf("-")).trim().toLowerCase());
// console.log(target.slice(0, target.indexOf("-")).trim().toLowerCase());

var chars = ['-', '(', '_', '|', '/'];
var slicer = function(songName, characters) {
    if ( Array.isArray(characters) ) {
        var result = songName;
        characters.forEach( function( char ) { 
            result = slicer( result, char );
        } );

        return result;
    }

    if (!songName.includes(characters)) {
        return songName;
    }
    return songName.slice(0, songName.indexOf(characters)).trim().toLowerCase();
}

function matchStrings(compare1, compare2) {

    compare1 = slicer(compare1, chars);
    compare2 = slicer(compare2, chars);

    if(compare1.length > compare2.length) {
        return compare1.includes(compare2);
    } else {
        return compare2.includes(compare1);
    }
};

// console.log(matchStrings(slicer(source, chars), slicer(target, chars)));
// console.log(slicer(source, "-"));
// console.log(slicer(target, "-"));
// console.log(slicer(target, chars ));

exports.match=matchStrings;
