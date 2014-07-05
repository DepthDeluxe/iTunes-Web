var os = require('os');
var express = require('express');
var itlib = require('./model/library');

var router = express.Router();

// require the itunes library
var itx_import = require('./util/itunes-xml-import');

router.get('/Music*', function(req, res) {
	// open the file we requested
	musicRoot = '/Users/colin/Music/iTunes/iTunes Media';
	path = musicRoot + req.path;

	res.sendfile(path);
});

router.get('/api/tracks/', function(req, res) {
	itlib.all_tracks().then(function(data) {
		res.status(200).send(data);
	});
});

router.get('/api/tracks/:id?', function(req, res) {
	itlib.track(req.params.id).then(function(data) {
		if (data.rows.length === 0) {
			res.status(404).send('not found');
		} else {
			res.status(200).send(data);
		}
	});
});

router.get('/', function(req, res) {
	itlib.all_tracks().then(function(data) {
		res.status(200).render('itunes', {
			trackList: tl
		});
	});
});

module.exports = router;
