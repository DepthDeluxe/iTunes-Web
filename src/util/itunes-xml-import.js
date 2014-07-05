var fs = require("fs");
var xmldoc = require("xmldoc");
var _ = require('underscore');

// main class that holds all the playlists and stuff
ITLibrary = function(trackList) {
	this.trackList = trackList;
};

// builds the model
function from_file(filename) {
	// read the contents of the file and generate tree
	var data = fs.readFileSync(filename);
	var xmlDoc = new xmldoc.XmlDocument(data);

	// get basic information about the library
	var library = {};
	library.version = _find_value_from_key('Application Version', xmlDoc);
	library.date = _find_value_from_key('Date', xmlDoc);

	// get the tracks and playlists
	library.tracks = _parse_all_tracks(xmlDoc);
	library.playlists = _parse_all_playlists(xmlDoc);

	return library;
}

function _parse_all_tracks(xmlDoc) {
	// get the track list
	var rootDict = xmlDoc.childNamed("dict");
	var tracks = rootDict.childNamed("dict");

	// iterate pairs at a time
	var trackList = [];
	for(var n = 0; n < tracks.children.length; n += 2) {
		// get the song key and corresponding dictionary
		var key = tracks.children[n].val;
		var dict = tracks.children[n + 1];

		var song = _parse_track_info(dict);
		trackList = trackList.concat([song]);
	}

	return trackList;
}

// returns an Object containing all elements from dictionary
function _parse_track_info(dict) {
	var song = {};

	// get some information about the song
	song.id = _find_value_from_key('Track ID', dict);
	song.name = _find_value_from_key('Name', dict);
	song.artist = _find_value_from_key('Artist', dict);
	song.album = _find_value_from_key('Album', dict);
	song.kind = _find_value_from_key('Kind', dict);
	song.genre = _find_value_from_key('Genre', dict);
	song.size = _find_value_from_key('Size', dict);
	song.location = _find_value_from_key('Location', dict);

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

function _parse_all_playlists(xmlDoc) {
	var rootDict = xmlDoc.childNamed('dict');
	var root = rootDict.childNamed('array');

	// parse every playlist
	var playlists = [];
	_.forEach(root.children, function(xmlPlaylist) {
		var playlist = _parse_playlist(xmlPlaylist);

		// add the parsed playlist to the list
		playlists.push(playlist);
	});

	console.log('loaded all playlists');
	return playlists;
}

function _parse_playlist(root) {
	var playlist = {};

	playlist.name = _find_value_from_key('Name', root);
	playlist.id = _find_value_from_key('Playlist ID', root);
	playlist.tracks = [];

	// build the track list
	var xmlArray = root.childNamed('array').childrenNamed('dict');
	_.forEach(xmlArray, function(dict) {
		var trackId = _find_value_from_key('Track ID', dict);

		playlist.tracks.push(trackId);
	});

	return playlist;
}

function _find_value_from_key(name, dict) {
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

module.exports = {
	from_file: from_file
};
