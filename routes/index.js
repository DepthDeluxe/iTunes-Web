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



router.get('/', function(req, res) {

	var debugText = itlib.modelInit();

	var song = new Object();
	song.title = "My Dick";
	song.artist = "Mikey Avalon";

	var slist = [song];

	res.render('itunes', {
		songList: slist,
		debugText: debugText
	});
});

module.exports = router;
