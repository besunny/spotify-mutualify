// var natural = require('natural');
var source = 'Shape Of My Heart - My Songs Version';
var target = 'Shape Of My (Heart) - Live At Villa Manin, Cudriopo, Italy/1993';

// console.log(natural.LevenshteinDistance(source, target, {search: true}));

// console.log(source.slice(0, source.indexOf("-")).trim().toLowerCase());
// console.log(target.slice(0, target.indexOf("-")).trim().toLowerCase());

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

console.log(slicer(source, "-"));
console.log(slicer(target, "-"));
console.log(slicer(target, ['-', '(', '_', '|', '/'] ));
