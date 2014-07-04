var nano = require('nano');
var seed = require('couchdb-seed-design');
var db = nano('http://localhost:5984').use('itunes-web');

seed(db, {
    songs: {
        views: {
            byId: function(doc) {
                emit(doc.id, doc);
            },
            byName: function(doc) {
                emit(doc.name, doc);
            }
        }
    }
}, function() {
    console.log('loaded the song documents');
});
