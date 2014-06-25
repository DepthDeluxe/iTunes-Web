var fs = require("fs");
var xmldoc = require("xmldoc");

// main class that holds all the playlists and stuff
ITLibrary = function(trackList) {
	this.trackList = trackList;
};

// builds the model
exports.loadTracks = function()
{
	fname = "data/itml.xml";

	// read the contents of the file and generate tree
	data = fs.readFileSync(fname);
	var xmlDoc = new xmldoc.XmlDocument(data);

	// get the track list
	rootDict = xmlDoc.childNamed("dict");
	tracks = rootDict.childNamed("dict");

	// iterate pairs at a time
	trackList = [];
	for(var n = 0; n < tracks.children.length; n += 2) {
		// get the song key and corresponding dictionary
		key = tracks.children[n].val;
		dict = tracks.children[n + 1];

		song = parseTrackInfo(dict);
		trackList = trackList.concat([song]);
	}

	return trackList;
}

// returns a reference to the library
exports.getLibrary = function()
{
	return library;
}

// returns an Object containing all elements from dictionary
function parseTrackInfo(dict) {
	song = new Object();

	// get some information about the song
	song.id = parseInt(dict.children[1].val);
	song.name = dict.children[3].val;
	song.artist = dict.children[5].val;
	song.albumArtist = dict.children[7].val;
	song.album = dict.children[9].val;
	song.genre = dict.children[11].val;
	song.kind = dict.children[13].val;
	song.size = parseInt(dict.children[15].val);

	// hunt for the location
	for (var n = 16; n < dict.children.length; n += 2) {
		val = dict.children[n].val;

		if (val == "Location") {
			song.location = new String(dict.children[n + 1].val);
		}
	}

	// prune the location to relative directory
	if (song.location == undefined) {
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