var nano = require('nano');
var seed = require('couchdb-seed-design');
var db = nano('http://localhost:5984').use('itunes-web');

seed(db, {
    tracks: {
        views: {
            allIds: function(doc) {
                if (doc.type === 1) {
                    emit(doc.id, doc.name);
                }
            },
            byId: function(doc) {
                if (doc.type === 1) {
                    emit(doc.id, doc);
                }
            },
            byName: function(doc) {
                if (doc.type === 1) {
                    emit(doc.name, doc);
                }
            }
        }
    },

    playlists: {
        views: {
            allIds: function(doc) {
                if (doc.type === 2) {
                    emit(doc.id, doc.name);
                }
            },
            byId: function(doc) {
                if (doc.type === 2) {
                    emit(doc.id, doc);
                }
            },
            byName: function(doc) {
                if (doc.type === 2) {
                    emit(doc.name, doc);
                }
            }
        }
    }
}, function() {
    console.log('loaded the design documents');
});
