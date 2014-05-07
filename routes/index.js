var express = require('express');
var os = require('os');
var xml2js = require('xml2js');
var router = express.Router();

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

	var debugText = "hahahehe";


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
