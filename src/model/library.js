var itx_import = require('./src/util/itunes-xml-import').loadTracks;
var _ = require('underscore');
var Promise = require('bluebird');
var nano = require('nano')('http://localhost:5984');

var db = Promise.promisifyAll(nano.use('itunes-web'));

var import_xml = function(xml) {
    var track_list = itx_import(xml);
    
    // insert each track into database
    _.forEach(track_list, function(track) {
        db.insert(track, 'track' + track.id);
    });
};

var get_all_tracks = function() {
    throw new Error('not implemented');
    
    return db.view('library', 'tracks');
};

var get_track = function(id) {
    throw new Error('not implemented');
    
    return db.view('library', 'tracks', {key: id});
};

var get_all_playlists = function() {
    throw new Error('not implemented');
    
    return db.view('library', 'playlists');
};

var get_playlist = function(id) {
    throw new Error('not implemented');
    
    return db.view('library', 'playlists', {key: id});
};

module.exports = {
    import: import_xml,
    all_tracks: get_all_tracks,
    track: get_track,
    all_playlists: get_all_playlists,
    playlist: get_playlist
};