var fs = require("fs");
var xmldoc = require("xmldoc");

// library objects
library = new Object();

// builds the model
exports.modelInit = function()
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
		songKey = tracks.children[n].val;
		songDict = tracks.children[n + 1].val;

		console.log(songKey);
	}

	return data;
}

// returns a reference to the library
exports.getLibrary = function()
{
	return library;
}