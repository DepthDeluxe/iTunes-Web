var fs = require("fs");
var xmldoc = require("xmldoc");
var _ = require('underscore');

// main class that holds all the playlists and stuff
ITLibrary = function(trackList) {
	this.trackList = trackList;
};

// builds the model
exports.loadTracks = function(filename)
{
	// read the contents of the file and generate tree
	var data = fs.readFileSync(filename);
	var xmlDoc = new xmldoc.XmlDocument(data);

	// get the track list
	var rootDict = xmlDoc.childNamed("dict");
	var tracks = rootDict.childNamed("dict");

	// iterate pairs at a time
	var trackList = [];
	for(var n = 0; n < tracks.children.length; n += 2) {
		// get the song key and corresponding dictionary
		var key = tracks.children[n].val;
		var dict = tracks.children[n + 1];

		var song = parseTrackInfo(dict);
		trackList = trackList.concat([song]);
	}

	return trackList;
};

// returns a reference to the library
exports.getLibrary = function()
{
	return library;
};

// returns an Object containing all elements from dictionary
function parseTrackInfo(dict) {
	var song = {};

	// get some information about the song
	song.id = findTrackKey('Track ID', dict);
	song.name = findTrackKey('Name', dict);
	song.artist = findTrackKey('Artist', dict);
	song.album = findTrackKey('Album', dict);
	song.kind = findTrackKey('Kind', dict);
	song.genre = findTrackKey('Genre', dict);
	song.size = findTrackKey('Size', dict);
	song.location = findTrackKey('Location', dict);

	// prune the location to relative directory
	if (song.location === undefined) {
		console.log("Could not find location for " + song.name);
	}
	else {
		folderList = song.location.split("/").splice(9);
		song.location = folderList.join("/");

		// replace HTML space with actual space
		song.location = song.location.split("%20").join(" ");
	}

	return song;
}

function findTrackKey(name, dict) {
	var is_next_val = false;
	var value;
	_.forEach(dict.children, function(child) {
		if (is_next_val) {
			value = child.val;
		}
		
		is_next_val = (child.name === 'key' && child.val === name);
	});
	
	return value;
}