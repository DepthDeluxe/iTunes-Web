var express = require('express');
var os = require('os');
var router = express.Router();

// require the itunes library
var itlib = require("../models/itlib");

/* GET home page. */
router.get('/info', function(req, res) {
	res.render('index', {
		request: req.path,
		title: 'NodeJS Demo Application',
		hostname: os.hostname(),
		platform: os.platform(),
		memused: (os.totalmem() - os.freemem()) / 1000000,
		memusage: (os.totalmem() - os.freemem()) / os.totalmem()
	});
});

router.get("/Music*", function(req, res) {
	// open the file we requested
	musicRoot = "/home/colin/temp/iTunes/iTunes Media";
	path = musicRoot + req.path;

	res.sendfile(path);
});

router.get('/', function(req, res) {

	var tl = itlib.loadTracks();

	res.render('itunes', {
		trackList: tl
	});
});

module.exports = router;
