var itx_import = require('../util/itunes-xml-import');
var _ = require('underscore');
var Promise = require('bluebird');
var nano = require('nano')('http://localhost:5984');

var db = Promise.promisifyAll(nano.use('itunes-web'));

// keeps track of what type the objects are
var types = {
    track: 1,
    playlist: 2
};

var import_xml = function(filename) {
    // import the list fmr the xml
    var library = itx_import.from_file(filename);

    db.insert(library.version, 'version');
    db.insert(library.date, 'date');

    // insert each track into database
    _.forEach(library.tracks, function(track) {
        track.type = types.track;
        db.insert(track, 'track' + track.id);
    });

    // insert each playlist into the database
    _.forEach(library.playlists, function(playlist) {
        playlist.type = types.playlist;
        db.insert(playlist, 'playlist' + playlist.id);
    });
};

var get_all_tracks = function() {
    return db.viewAsync('tracks', 'allIds')
        .then(function(data) {
            return data[0];
        });
};

var get_track = function(id) {
    return db.viewAsync('tracks', 'byId', {key: id})
        .then(function(data) {
            return data[0];
        });
};

var get_all_playlists = function() {
    return db.viewAsync('playlists', 'playlists');
};

var get_playlist = function(id) {
    return db.viewAsync('playlists', 'playlists', {key: id});
};

module.exports = {
    import: import_xml,
    all_tracks: get_all_tracks,
    track: get_track,
    all_playlists: get_all_playlists,
    playlist: get_playlist,
    types: types
};
