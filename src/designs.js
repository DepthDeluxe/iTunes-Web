var nano = require('nano');
var seed = require('couchdb-seed-design');
var db = nano('http://localhost:5984').use('itunes-web');

var trackMatch = /track[0-9]+/;
var playlistMatch = /playlist[0-9]+/;

seed(db, {
    tracks: {
        views: {
            allIds: function(doc) {
                if (doc._id.match(trackMatch)) {
                    emit(doc.id, doc.name);
                }
            },
            byId: function(doc) {
                if (doc._id.match(trackMatch)) {
                    emit(doc.id, doc);
                }
            },
            byName: function(doc) {
                if (doc._id.match(trackMatch)) {
                    emit(doc.name, doc);
                }
            }
        }
    },

    playlists: {
        views: {
            allIds: function(doc) {
                if (doc._id.match(playlistMatch)) {
                    emit(doc.id, doc.name);
                }
            },
            byId: function(doc) {
                if (doc._id.match(playlistMatch)) {
                    emit(doc.id, doc);
                }
            },
            byName: function(doc) {
                if (doc._id.match(playlistMatch)) {
                    emit(doc.name, doc);
                }
            }
        }
    }
}, function() {
    console.log('loaded the design documents');
});
