var itx_import = require('../util/itunes-xml-import');
var _ = require('underscore');
var Promise = require('bluebird');
var nano = require('nano')('http://localhost:5984');

var db = Promise.promisifyAll(nano.use('itunes-web'));

var import_xml = function(filename) {
    // import the list fmr the xml
    var track_list = itx_import.from_file(filename);

    // insert each track into database
    _.forEach(track_list, function(track) {
        db.insert(track, 'track' + track.id);
    });
};

var get_all_tracks = function() {
    return db.view('library', 'tracks')
        .catch(function(err) {
            console.log(err);
        });
};

var get_track = function(id) {
    return db.view('library', 'tracks', {key: id})
        .catch(function(err) {
            console.log(err);
        });
};

var get_all_playlists = function() {
    return db.view('library', 'playlists')
        .catch(function(err) {
            console.log(err);
        });
};

var get_playlist = function(id) {
    return db.view('library', 'playlists', {key: id})
        .catch(function(err) {
            console.log(err);
        });
};

module.exports = {
    import: import_xml,
    all_tracks: get_all_tracks,
    track: get_track,
    all_playlists: get_all_playlists,
    playlist: get_playlist
};
