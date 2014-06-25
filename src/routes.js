var os = require('os');
var express = require('express');
var router = express.Router();

// require the itunes library
var itx_import = require("./util/itunes-xml-import");

router.get("/Music*", function(req, res) {
	// open the file we requested
	musicRoot = "/home/colin/temp/iTunes/iTunes Media";
	path = musicRoot + req.path;

	res.sendfile(path);
});

router.get("/api*", function(req, res) {
	res.send(itx_import.loadTracks('./data/itml.xml'));
});

router.get('/', function(req, res) {

	var tl = itx_import.loadTracks('./data/itml.xml');

	res.render('itunes', {
		trackList: tl
	});
});

module.exports = router;
