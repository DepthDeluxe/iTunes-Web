var fs = require("fs");
var xmldoc = require("xmldoc");

// library objects
library = new Object();

// builds the model
exports.loadTracks = function()
{
	console.log(__dirname);

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

		console.log(song.name);
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
	song.trackId = dict.children[1].val;
	song.name = dict.children[3].val;
	song.artist = dict.children[5].val;
	song.albumArtist = dict.children[7].val;
	song.album = dict.children[9].val;
	song.genre = dict.children[11].val;
	song.kind = dict.children[13].val;
	song.size = dict.children[15].val;

	return song;
}